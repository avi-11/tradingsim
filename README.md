# Introduction


0xTradingSim is a crypto trading simulator built by [Invsto Team](https://invsto.com/) for forecasting ticker prices based on expected market volatility. In addition, the trading simulator has options for users to create a simple strategy using technical analysis by adding entry and exit parameters.

The trading sim has unique features such as: 
- Candlestick charting for displaying OHLC (open-high-low-close) prices along with strategy related signals such as buys and sells
- A strategy builder for building entries and exits
- Integration with TA (https://github.com/bukosabino/ta) for building technical indicators
- Integration with QuantStats (https://github.com/ranaroussi/quantstats) for performance related metrics

# Demo
The product is hosted on Netlify.

[0xTradingSim Access link](https://stupendous-eclair-039b32.netlify.app/)

Product Demo:
[![IMAGE ALT TEXT](http://img.youtube.com/vi/wfm0-CpwIYc/0.jpg)](http://www.youtube.com/watch?v=wfm0-CpwIYc "0xTradingSim Demo")


# User Guide:

## Price Forecasts:

As a first step, a user would provide the following inputs to simulate price forecasts:

Instrument name like BTC or ETH
Current market price of the instrument
Expected volatility (in simple categories such as High/Medium/Low)

The app would then generate forecasted prices based on the user inputs

## Strategy Builder:
How to build a rules based strategy  in trading Sim ?

We have two types of rules in the strategy builder :
Entry Rule (used for choosing when a strategy would enter into a position)
Exit rule (used to choose when a strategy would exit a position)

In addition, there are two types of positions: LONG and SHORT. Currently, the trading sim support Long-Only strategies.

We have 6 variants of the strategy rules (entries or exits) where users can input their criteria: 

- **Indicator -operator-Indicator:** Input an indicator like SMA(Simple moving Average), RSI (Relative Strength Index) or  Average Directional Movement Index and have a operator for comprasion like greater than, less than or equal with with a similar indicator. So SMA10> SMA 20 when this condition is met and entry will be created.
- **Indicator-operator-price:** Input indicators and operator but comparison is done with direct price.Example : SMA(50)> Close(price)
- **Indicator-operator-Value:** Input indicators and operator but comparison is done with direct price.Example : SMA(50)> 1100
- **Price-operator-price:** In this price is compared to another price. Example : high > close
- **Price-operator-value:** In this value (a number) is compared with a price for the current timestamp. Example : high > 75.5
