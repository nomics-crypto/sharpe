# Nomics Front-End Technical Interview

Hello, and welcome to the Nomics Front-End Engineer technical interview coding challenge!

There are two ways to take this challenge, and there's no advantage either way. We recognize that developers work in different ways and are more comfortable with some situations, while others may make them anxious. We also understand that developers come from all walks of life and have different constraints around their time. We want to see how you code when you're at your best, so choose what works best for you.

Choose one of these methods:

1. **In-person pairing**: work on this code challenge while pairing with your interviewer
2. **Take-home**: work on this code challenge on your own, then present it to your interviewer (like a live code review)

Then:

1. Set up a time to pair on it with your interviewer, or:
2. Set up a time to show your solution to your interviewer

Then:

1. Read over the code challenge so you're familiar with what you'll be working on, or:
2. Work on the code challenge on your own, then send your solution to your interviewer *at least one day ahead of time* (public link, shared private repo, or emailing an archive are all ok)

**In both cases you are expected to spend 1-1.5 hours on this challenge**. Code quality is far more important than the amount of the challenge you are able to complete. We have deliberately included more than we expect you can complete in the time alotted. Please don't try to do it all, just get through what you can and focus on your code quality.

## Rules

Whether you are taking this home or pairing in-person, we have a short list of rules you must follow:

1. You **may** use any online or offline resource, google, stackoverflow, docs, books, etc.
1. You **may not** get direct help or code from anyone
1. All the code you submit as part of the interview must be written by you
1. You **may** use any existing public library or nodejs package
1. You **may** ask your interviewer any question you'd like, it's up to them to decide to answer, and this doesn't count against you in any way. Please ask about anything you find unclear, it will help us make this challenge better.

## Challenge: Computing Sharpe Ratios for Crytoassets

> In finance, the Sharpe ratio (also known as the Sharpe index, the Sharpe measure, and the reward-to-variability ratio) is a way to examine the performance of an investment by adjusting for its risk. The ratio measures the excess return (or risk premium) per unit of deviation in an investment asset or a trading strategy, typically referred to as risk, named after William F. Sharpe.
>
> https://en.wikipedia.org/wiki/Sharpe_ratio

Our goal is to calculate the Sharpe ratio for cryptoassets to determine which had the best returns relative to their risk (volatility). We'll be calculating the [Ex Post Sharpe Ratio](https://web.stanford.edu/~wfsharpe/art/sr/sr.htm) which means we'll be calculating it over past data, not trying to predict future returns.

We will be using a simplified version of the Ex Post Sharpe Ratio by using a 0% return as our benchmark. This makes the Ex Post Sharpe Ratio:

```
S = A / D
```

`S` is the Sharpe Ratio, `A` is the average return, and `D` is the standard deviation of returns. Using [math.js](http://mathjs.org/) we can do this in JavaScript pretty easily:

```js
const sharpe = math.mean(returns) / math.std(returns);
```

All we need are the returns, and that's where the Nomics API comes in. We will be using an unofficial API endpoint (because the official API isn't complete yet):

https://api.nomics.com/v0/sparkline

The format for the response looks like this:

```json
{
  "day": [{"currency":"1ST","timestamps":["2018-03-13T14:00:00Z",...],"closes":["0.19319",...]},...],
  "week": [{"currency":"1ST","timestamps":["2018-03-08T00:00:00Z",...],"closes":["0.24150",...]},...],
  "month": [{"currency":"1ST","timestamps":["2018-02-13T00:00:00Z",...],"closes":["0.49572",...]},...],
  "year": [{"currency":"1ST","timestamps":["2017-05-08T00:00:00Z",...],"closes":["0.55635",...]},...],
}
```

Using the `year` field, we have an array of currency objects with timestamps and close prices for each day for the past year (or as far back as Nomics has data for that currency). The daily return is the difference in price divided by the starting price, like this:

```js
returns[1] = (price[1] - price[0]) / price[0];
```

So, the return for a given day is that day's price minus the day before's price divided by the day before's price. If today the price is $100, and yesterday it was $80, the return is `($100-$80)/$80 = 0.25 = 25%`.

We're ready to get started!

## Building our App

Here are the steps we'd like you to take towards building your app. Remember you don't need to finish (and we don't expect you to), we care more about the quality of the code you write than how far you get.

1. Write code that takes an array of returns and returns the Sharpe Ratio
1. Write code that fetches data from the Nomics Sparkline API and returns currencies with their daily returns over the past year
1. Write code that uses those two functions to return currencies with their Sharpe Ratios
1. Edit the React App to display a table of currencies with their Sharpe Ratios
1. Make the table sortable by currency symbol or Sharpe Ratio
1. Show the total return for the asset, average daily return, and standard deviation of the return in the table for each asset and make the table sortable by those fields too

Every step of the way we expect you to test and refactor your code, make it look good!
