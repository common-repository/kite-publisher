<?php
/*
* Plugin Name: Kite Publisher
* Description: Embed Kite Connect trade buttons on your posts/pages
* Version: 1.0
* Author: Vivek R
* Author URI: https://kite.trade
*/
class KitePublisher{
	/**
	 * $shortcode_tag
	 * holds the name of the shortcode tag
	 * @var string
	 */
	public $shortcode_tag = 'kite';

	/**
	 * __construct
	 * class constructor will set the needed filter and action hooks
	 *
	 * @param array $args
	 */
	function __construct($args = array()){
		//add shortcode
		add_shortcode( $this->shortcode_tag, array( $this, 'render_kite_publisher' ) );

		// Add kite publisher script to footer
		add_action( 'wp_enqueue_scripts', array($this , 'enqueue_kite_publisher_js' ) );

		if ( is_admin() ){
			add_action('admin_head', array( $this, 'admin_head'));
			add_action('admin_enqueue_scripts', array($this , 'enqueue_admin_scripts'));
		}
	}

	/**
	 * render_kite_publisher
	 * @param  array  $atts shortcode attributes
	 * @param  string $content shortcode content
	 * @return string
	 */
	function render_kite_publisher($atts , $content = null){
		// Attributes
		$atts = shortcode_atts(
			array(
				'type' => 'branded',
				'href' => '#',
				'api_key' => 'dxx4xxq30trh91ls',
				'exchange' => 'NSE',
				'tradingsymbol' => 'INFY',
				'transaction_type' => 'BUY',
				'quantity' => '1',
				'order_type' => 'MARKET',
				'variety' => 'regular',
				'price' => '0',
				'trigger_price' => '0',
				'product' => 'MIS',
				'validity' => 'DAY',
				'readonly' => 'false',
				'tag' => 'WP'
			),
			$atts,
			'kite'
		);

		$button_type = 'kite-button';

		if ($atts['type'] == 'link') {
			$button_type = 'a';
		} elseif ($atts['type'] == 'button') {
			$button_type = 'button';
		}

		$code = '<'. $button_type .' href='. $atts['href']
					.' data-kite='. $atts['api_key']
					.' data-exchange='. $atts['exchange']
					.' data-tradingsymbol='. $atts['tradingsymbol']
					.' data-transaction_type='. $atts['transaction_type']
					.' data-quantity='. $atts['quantity']
					.' data-order_type='. $atts['order_type']
					.' data-variety='. $atts['variety']
					.' data-price='. $atts['price']
					.' data-trigger_price='. $atts['trigger_price']
					.' data-product='. $atts['product']
					.' data-validity='. $atts['validity']
					.' data-tag='. $atts['tag']
					.' data-readonly='. $atts['readonly']
					.' >'. $content .'</'. $button_type .'>';

		return $code;
	}

	/**
	 * admin_head
	 * calls your functions into the correct filters
	 * @return void
	 */
	function admin_head() {
		// check user permissions
		if ( !current_user_can( 'edit_posts' ) && !current_user_can( 'edit_pages' ) ) {
			return;
		}

		// check if WYSIWYG is enabled
		if ( 'true' == get_user_option( 'rich_editing' ) ) {
			add_filter( 'mce_external_plugins', array( $this ,'mce_external_plugins' ) );
			add_filter( 'mce_buttons', array($this, 'mce_buttons' ) );
		}
	}

	/**
	 * mce_external_plugins
	 * Adds our tinymce plugin
	 * @param  array $plugin_array
	 * @return array
	 */
	function mce_external_plugins( $plugin_array ) {
		$plugin_array[$this->shortcode_tag] = plugins_url( 'js/editor.js' , __FILE__ );
		return $plugin_array;
	}

	/**
	 * mce_buttons
	 * Adds our tinymce button
	 * @param  array $buttons
	 * @return array
	 */
	function mce_buttons( $buttons ) {
		array_push( $buttons, $this->shortcode_tag );
		return $buttons;
	}

	/**
	 * enqueue_admin_scripts
	 * Used to enqueue custom styles
	 * @return void
	 */
	function enqueue_admin_scripts(){
		 wp_enqueue_style('kite_publisher_js', plugins_url( 'css/editor.css' , __FILE__ ) );
	}

	/**
	 * enqueue_kite_publisher_js
	 * Enqueue Kite Connect publisher js
	 * @return void
	 */
	function enqueue_kite_publisher_js() {
		wp_register_script('kite_publisher_js', 'https://kite.zerodha.com/publisher.js', array(), '1.0', true);
		wp_enqueue_script('kite_publisher_js');
	}
}

new KitePublisher();
