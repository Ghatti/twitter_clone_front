import { screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Feed from "./Feed";
import { renderWithRedux } from "../../renderWithRedux";
import { client } from "../../api/client";

jest.mock("../../api/client");

function mockTweet() {
  return {
    id: 1,
    author: 1,
    retweet: 0,
    content: 1000,
    parent: null,
    original: null,
  };
}

function mockTweetContent() {
  return {
    id: 1000,
    author: 1,
    message: "This is my second tweet lol getting good at this",
    attach: null,
    created_at: new Date().getTime(),
    poll: 0,
    comment: null,
    liked_by: [],
    retweeted_by: [],
    comment_ids: [],
    pollSettings: {
      choices: ["hi", "ho"],
      pollLen: {
        days: 1,
        hours: 3,
        minutes: 35,
      },
    },
  };
}

const initialState = {
  tweets: {
    status: "fulfilled",
    error: null,
    data: [mockTweet()],
  },
  tweetContent: {
    status: "fulfilled",
    error: null,
    data: [mockTweetContent()],
  },
  page: {
    status: "idle",
    error: null,
    data: [],
  },
};

afterEach(cleanup);

describe("Like tests", () => {
  test("Tweet get one more like", async () => {
    //mock api response to liking a tweet
    client.put.mockResolvedValue({
      success: true,
      updatedTweet: { ...mockTweetContent(), liked_by: [1] },
    });

    renderWithRedux(<Feed />, { initialState });

    //check number of likes the tweet has
    const likesNum = parseInt(
      screen.getByLabelText("number of likes").textContent
    );
    expect(likesNum).toBe(0);

    //click the like button
    userEvent.click(screen.getByRole("button", { name: /^like tweet$/i }));

    //check number of likes the tweet has after the click
    const likesLabel = await screen.findByLabelText("number of likes");
    const updatedLikes = parseInt(likesLabel.textContent);
    expect(updatedLikes).toBe(1);
  });

  test("Unlike tweet", async () => {
    const oldTweet = mockTweetContent();
    //mock api response to liking and unliking a tweet
    client.put
      .mockImplementationOnce(() => {
        return {
          success: true,
          updatedTweet: { ...oldTweet, liked_by: [1] },
        };
      })
      .mockImplementationOnce(() => {
        return {
          success: true,
          updatedTweet: { ...oldTweet, liked_by: [] },
        };
      });

    renderWithRedux(<Feed />, { initialState });

    //check number of likes the tweet has
    const likesNum = parseInt(
      screen.getByLabelText("number of likes").textContent
    );
    expect(likesNum).toBe(0);

    //click the like button
    userEvent.click(screen.getByRole("button", { name: /^like tweet$/i }));

    //check number of likes the tweet has after the first click
    let likesLabel = await screen.findByLabelText("number of likes");
    let updatedLikes = parseInt(likesLabel.textContent);
    expect(updatedLikes).toBe(1);

    //click Like button again
    userEvent.click(screen.getByRole("button", { name: /^like tweet$/i }));

    //check number of likes the tweet has after the second click
    likesLabel = await screen.findByLabelText("number of likes");
    updatedLikes = parseInt(likesLabel.textContent);
    expect(updatedLikes).toBe(0);
  });
});

/*
  - Get retweet button x
  - Click retweet button x
  - get simple retweet button x
  - click simple retweet button x
  - check that the menu has been closed
  - try to get the simples retweet button - shouldn't be able to
  - check if the retweet has been inserted
  */

test("Simple Retweet test", async () => {
  const oldTweetContent = mockTweetContent();
  //mock api response to post retweet
  client.post.mockResolvedValue({
    success: true,
    tweetContent: { ...oldTweetContent, retweeted_by: [1] },
    tweet: {
      id: 10055,
      author: 1,
      retweet: 1,
      content: oldTweetContent.id,
      parent: null,
    },
  });

  renderWithRedux(<Feed />, { initialState });

  //click retweet button
  userEvent.click(screen.getByRole("button", { name: /^Retweet$/i }));
  //click simple retweet button
  userEvent.click(screen.getByRole("menuitem", { name: /retweet/i }));

  //check if a new retweet is on the page
  let youRetweeted = await screen.findByText(/you retweeted/i);
  expect(youRetweeted).toBeInTheDocument();

  //check if retweet number is updated
  let retweetCounters = screen
    .getAllByLabelText("number of retweets")
    .map((counter) => parseInt(counter.textContent));
  expect(retweetCounters[0]).toBe(retweetCounters[1]);
  expect(retweetCounters[0]).toBe(1);
});

test("Undo retweet", async () => {
  const oldTweetContent = mockTweetContent();
  //mock api response to post and delete retweet
  client.post.mockResolvedValue({
    success: true,
    tweetContent: { ...oldTweetContent, retweeted_by: [1] },
    tweet: {
      id: 10055,
      author: 1,
      retweet: 1,
      content: oldTweetContent.id,
      parent: null,
    },
  });

  client.delete.mockResolvedValue({
    success: true,
    updatedTweet: { ...oldTweetContent, retweeted_by: [] },
  });

  renderWithRedux(<Feed />, { initialState });

  //click retweet button
  userEvent.click(screen.getByRole("button", { name: /^Retweet$/i }));
  //click simple retweet button
  userEvent.click(screen.getByRole("menuitem", { name: /retweet/i }));

  //check if a new retweet is on the page
  let youRetweeted = await screen.findByText(/you retweeted/i);
  expect(youRetweeted).toBeInTheDocument();

  //click retweet button
  userEvent.click(screen.getAllByRole("button", { name: /^Retweet$/i })[0]);
  //click undo retweet button
  userEvent.click(screen.getByRole("menuitem", { name: /undo retweet/i }));

  await waitFor(() => {
    expect(screen.queryByText(/you retweeted/i)).not.toBeInTheDocument();
  });

  //check if retweet number is updated
  let retweetCounters = parseInt(
    screen.getByLabelText("number of retweets").textContent
  );
  expect(retweetCounters).toBe(0);
});

test("Comment tweet with button", async () => {
  const typedText = "I'm testing this answer stuff";
  const oldTweet = mockTweet();
  const oldTweetContent = mockTweetContent();
  //mock api response to post cmment
  client.post.mockResolvedValue({
    success: true,
    updatedTweet: {
      tweet: oldTweet,
      tweetContent: { ...oldTweetContent, comment_ids: [1005] },
    },
    tweet: {
      id: 1999,
      author: 1,
      retweet: 0,
      content: 99999,
      parent: oldTweet.id,
      original: null,
    },
    tweetContent: {
      id: 99999,
      author: 1,
      message: typedText,
      attach: null,
      created_at: new Date().getTime(),
      poll: 0,
      comment: null,
      liked_by: [],
      retweeted_by: [],
      comment_ids: [],
      pollSettings: {
        choices: ["hi", "ho"],
        pollLen: {
          days: 1,
          hours: 3,
          minutes: 35,
        },
      },
    },
  });

  renderWithRedux(<Feed />, { initialState });

  const tweet = screen.getByText(
    /This is my second tweet lol getting good at this/i
  );
  expect(tweet).toBeInTheDocument();

  //click comment button
  userEvent.click(screen.getByRole("button", { name: /^comment tweet$/i }));

  let button = screen.getByRole("button", { name: /^comment$/i });
  expect(button).toBeDisabled();

  //type new comment
  const commentBox = screen.getByPlaceholderText(/Answer this tweet/);
  userEvent.type(commentBox, typedText);

  expect(commentBox.value).toBe(typedText);
  expect(button).not.toBeDisabled();

  //click button to send comment
  userEvent.click(button);
  expect(commentBox.value).toBe("");

  //check if comment was sent
  const newComment = await screen.findByText(typedText);
  expect(newComment).toBeInTheDocument();
});
