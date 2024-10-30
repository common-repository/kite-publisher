(function() {
	tinymce.PluginManager.add('kite', function( editor, url ) {
		console.log("url", url);

		var sh_tag = 'kite';

		//add popup
		editor.addCommand('kite_popup', function(ui, v) {
			//setup defaults
			var exchange = 'NSE',
				tradingsymbol = 'INFY',
				transaction_type = 'BUY',
				order_type = 'MARKET',
				product = 'MIS',
				quantity = '1',
				content = '',
				advanced = false,
				button_type = 'branded';

			editor.windowManager.open({
				// autoScroll: true,
				width: 400,
				height: 400,
				classes: 'kite-panel',
				title: 'Kite Publisher',
				body: [
					{
						type: 'listbox',
						name: 'kite_exchange',
						label: 'Exchange',
						value: v.exchange || exchange,
						'values': [
							{text: 'NSE', value: 'NSE'},
							{text: 'BSE', value: 'BSE'},
							{text: 'NFO', value: 'NFO'},
							{text: 'CDS', value: 'CDS'},
							{text: 'MCX', value: 'MCX'}
						],
						tooltip: 'Select exchange'
					},
					{
						type: 'textbox',
						name: 'kite_tradingsymbol',
						label: 'Tradingsymbol',
						value: v.tradingsymbol || tradingsymbol,
						tooltip: 'Tradingsymbol. Ex. INFY, RELIANCE, NIFTY17JANFUT'
					},
					{
						type: 'listbox',
						name: 'kite_transaction_type',
						label: 'Transaction type',
						value: v.transaction_type || transaction_type,
						'values': [
							{text: 'BUY', value: 'BUY'},
							{text: 'SELL', value: 'SELL'}
						],
						tooltip: 'Select transaction type'
					},
					{
						type: 'listbox',
						name: 'kite_order_type',
						label: 'Order type',
						value: v.order_type || order_type,
						'values': [
							{text: 'MARKET', value: 'MARKET'},
							{text: 'LIMIT', value: 'LIMIT'},
							{text: 'SL-M', value: 'SL-M'},
							{text: 'SL', value: 'SL'}
						],
						tooltip: 'Select order type',
						onselect: function(e) {
							currentVal = e.target.state.data.value;

							this.parent().parent().find('#kite_price_fields').show();

							if(currentVal == 'LIMIT') {
								this.parent().parent().find('#kite_price').show();
								this.parent().parent().find('#kite_trigger_price').hide();
							} else if(currentVal == 'SL') {
								this.parent().parent().find('#kite_price').show();
								this.parent().parent().find('#kite_trigger_price').show();
							} else if(currentVal == 'SL-M') {
								this.parent().parent().find('#kite_price').hide();
								this.parent().parent().find('#kite_trigger_price').show();
							} else if(currentVal == 'MARKET') {
								this.parent().parent().find('#kite_price_fields').hide();
							}
						}
					},
					{
						type: 'listbox',
						name: 'kite_product',
						label: 'Order product',
						value: v.product || product,
						'values': [
							{text: 'NRML', value: 'NRML'},
							{text: 'CNC', value: 'CNC'},
							{text: 'MIS', value: 'MIS'}
						],
						tooltip: 'Select order product'
					},
					{
						type: 'textbox',
						name: 'kite_quantity',
						label: 'Quantity',
						value: v.quantity || quantity,
						tooltip: 'Quantity'
					},
					{
						type: 'fieldset',
						name: 'kite_price_fields',
						label: '',
						items: [
							{
								type: 'textbox',
								name: 'kite_price',
								label: 'Price',
								value: v.price,
								tooltip: 'price'
							},
							{
								type: 'textbox',
								name: 'kite_trigger_price',
								label: 'Trigger price',
								value: v.trigger_price,
								tooltip: 'trigger_price'
							}
						],
						hidden: true
					},
					{
						type: 'listbox',
						name: 'kite_button_type',
						label: 'Button type',
						value: v.button_type || button_type,
						'values': [
							{text: 'Branded', value: 'branded'},
							{text: 'Custom button', value: 'button'},
							{text: 'Anchor Link', value: 'link'}
						],
						tooltip: 'Select button type'
					},
					{
						type: 'textbox',
						name: 'kite_content',
						label: 'Button content',
						value: v.content || content
					},
					{
						type: 'button',
						name: 'kite_advanced',
						text: 'Advanced options',
						label: '',
						value: v.advanced || advanced,
						onclick: function(e) {
							console.log(this)

							v.advanced = !v.advanced;
							if(v.advanced) {
								this.parent().find('#kite_advanced_params').show();
							} else {
								this.parent().find('#kite_advanced_params').hide();
							}
						}
					},
					{
						type: 'fieldset',
						name: 'kite_advanced_params',
						label: '',
						items: [
							{
								type: 'listbox',
								name: 'kite_variety',
								label: 'Order variety',
								value: v.variety,
								'values': [
									{text: 'regular', value: 'regular'},
									{text: 'amo', value: 'amo'},
								],
								tooltip: 'Select order variety'
							},
							{
								type: 'listbox',
								name: 'kite_validity',
								label: 'Order validity',
								value: v.validity,
								'values': [
									{text: 'DAY', value: 'DAY'},
									{text: 'IOC', value: 'IOC'},
								],
								tooltip: 'Select order validity'
							},
							{
								type: 'textbox',
								name: 'kite_tag',
								label: 'Order tag',
								value: v.tag,
								tooltip: 'Select order tag (maximum 8 characters)'
							},
							{
								type: 'checkbox',
								name: 'kite_readonly',
								label: 'Is order readonly?',
								value: v.readonly,
								tooltip: 'Set order as non editable.'
							},
							{
								type: 'textbox',
								name: 'kite_api_key',
								label: 'Kite publisher api key',
								value: v.kite_api_key,
								tooltip: 'Kite publisher api key'
							}
						],
						hidden: true
					}
				],
				onsubmit: function( e ) {
					var shortcode_str = '[' + sh_tag;

					if (typeof e.data.kite_button_type != 'undefined' && e.data.kite_button_type.length)
						shortcode_str += ' type="' + e.data.kite_button_type + '"';

					if (typeof e.data.kite_api_key != 'undefined' && e.data.kite_api_key.length)
						shortcode_str += ' api_key="' + e.data.kite_api_key + '"';

					if (typeof e.data.kite_exchange != 'undefined' && e.data.kite_exchange.length)
						shortcode_str += ' exchange="' + e.data.kite_exchange + '"';

					if (typeof e.data.kite_transaction_type != 'undefined' && e.data.kite_transaction_type.length)
						shortcode_str += ' transaction_type="' + e.data.kite_transaction_type + '"';

					if (typeof e.data.kite_tradingsymbol != 'undefined' && e.data.kite_tradingsymbol.length)
						shortcode_str += ' tradingsymbol="' + e.data.kite_tradingsymbol + '"';

					if (typeof e.data.kite_quantity != 'undefined' && e.data.kite_quantity.length)
						shortcode_str += ' quantity="' + e.data.kite_quantity + '"';

					if (typeof e.data.kite_order_type != 'undefined' && e.data.kite_order_type.length)
						shortcode_str += ' order_type="' + e.data.kite_order_type + '"';

					if (typeof e.data.kite_product != 'undefined' && e.data.kite_product.length)
						shortcode_str += ' product="' + e.data.kite_product + '"';

					if (typeof e.data.kite_price != 'undefined' && e.data.kite_price.length)
						shortcode_str += ' price="' + e.data.kite_price + '"';

					if (typeof e.data.kite_trigger_price != 'undefined' && e.data.kite_trigger_price.length)
						shortcode_str += ' trigger_price="' + e.data.kite_trigger_price + '"';

					if (typeof e.data.kite_variety != 'undefined' && e.data.kite_variety.length)
						shortcode_str += ' variety="' + e.data.kite_variety + '"';

					if (typeof e.data.kite_validity != 'undefined' && e.data.kite_validity.length)
						shortcode_str += ' validity="' + e.data.kite_validity + '"';

					if (typeof e.data.kite_tag != 'undefined' && e.data.kite_tag.length)
						shortcode_str += ' tag="' + e.data.kite_tag + '"';

					if (typeof e.data.kite_readonly != 'undefined')
						shortcode_str += ' readonly="' + e.data.kite_readonly + '"';

					//add panel content
					shortcode_str += ']' + e.data.kite_content + '[/' + sh_tag + ']';

					//insert shortcode to tinymce
					editor.insertContent(shortcode_str);
				}
			});
		  });

		//add button
		editor.addButton('kite', {
			icon: 'kite',
			image: url + '/images/icon.png',
			tooltip: 'Kite Publisher panel',
			onclick: function() {
				editor.execCommand('kite_popup','',{
					header : '',
					footer : '',
					type   : 'default',
					content: ''
				});
			}
		});
	});
})();
