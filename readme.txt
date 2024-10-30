=== Kite Publisher ===
Contributors: zerodha
Donate link: https://kite.trade/publisher
Tags: trade, trading, kite, invest, stock market, share market
Requires at least: 4.0
Tested up to: 4.7
Stable tag: 4.7
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Embed Kite Connect trade buttons on your posts/pages, and allow visitors to execute trades with just a couple clicks.

== Description ==

Embed [Kite Connect](https://kite.trade/publisher) trade buttons on your posts/pages using WordPress shortcodes and add better user experience for your end users, be it readers of your financial blog or consumers of your market analysis. A trading experience unlike anything for them, and prospects of added revenue for you.

## Usage

1. You can embed shortcode through WordPress visual editor. Look for the Kite logo in your editor buttons.
2. Manually embed short code.

## Examples

#### Branded Kite button
`[kite type="branded" exchange="NSE" transaction_type="BUY" tradingsymbol="INFY" quantity="1" order_type="MARKET" product="MIS" variety="regular" validity="DAY"][/kite]`

#### Custom button
`[kite type="button" exchange="NSE" transaction_type="BUY" tradingsymbol="INFY" quantity="5" order_type="LIMIT" product="MIS" price="200" variety="regular" validity="DAY"]BUY NSE @ 200[/kite]`

#### Anchor tag
`[kite type="link" exchange="NSE" transaction_type="BUY" tradingsymbol="INFY" quantity="1" order_type="MARKET" product="MIS" variety="regular" validity="DAY"]BUY INFY [/kite]`

## Available attributes

* `exchange` - Name of the exchange (default: `NSE`).
* `tradingsymbol` - Tradingsymbol of the instrument (default: `INFY`).
* `transaction_type` - BUY or SELL (default: `BUY`).
* `price` - For LIMIT and SL orders.
* `trigger_price` - For SL, SL-M orders.
* `quantity` - Quantity to transact (default: `1`).
* `order_type` - Order type (MARKET, LIMIT, SL, SL-M) (default: `MARKET`)
* `variety` - Order variety (regular or amo) (default: `regular`)
* `product` - Order product (MIS, CNC, NRML) (default: `MIS`)
* `validity` - Order validity (DAY or IOC) (default: `DAY`)
* `readonly` - set order as editable or not. (default: `false`)
* `api_key` - Custom Kite publisher api key. You can [signup here](https://developers.kite.trade) to ger your own `api_key`.
* `tag` - Order tag (maxium 8 alphanumeric characters) (default: `WP` )

== Installation ==

1. Upload the plugin folder to the `/wp-content/plugins/` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress

== Frequently Asked Questions ==

== Screenshots ==

1. editor-button.png
2. editor-options.png

== Changelog ==

= 1.0 =
Initial release.

= 1.0.1 =
Updated readme file.
