Get Order Total
=======

### Overview

This document describes Get Order Total API used for "Mobile Ordering Orchestration" service.

This API will take a list of items from the mobile client with the guest orders including guest's dining plan item pass it to venue next and will receive two prices of order total, one price which will represents the total of the order (including the ones covered by a dining plan) and other price which represents the total of the covered items.

### VenueNext

It is the third party service which receives a request including order ID and store ID from mobile client which stores all items on its side with prices and maps the uuid received from mobile ordering orchestration service to the linked price. The VN does the calculation (sum) and taxes and returns the total prices, discounts, tips and sort out things on the VN response (Get total order api) and differentiates between the items consideration covered by dining plan.

### Input and Output Parameters of VenueNext

The input parameters received from mobile ordering orchestration service comprises of store ID, order ID and item ID of VN such as storeVNId, orderVNId and different items details such as itemVNId and type.

This service retrieves a valid SWID after authenticating and validating the user request.

### Example
Sample Request
	
	POST https://disney-production-stadium.venuenext.net/v4/orders/total.json

Headers:

	- Content-Type: application/json

Current State:

Payload:
```
	{
		"stand_menu_uuid": "e3a0fcad-0baf-4569-a8ab-1bd73b8776ec",
		"order_uuid": "9f11ec71-9345-4114-9bda-087365cdfc2a",
		"order_menu_items": [
			{
				"menu_item_uuid": "a82a26be-7f15-4f8d-9495-aa6c212658f9",
				"quantity": 1,
				"modifiers":[
					[
						{
							"menu_item_uuid": "1393c80c-7480-4a0c-b04c-b0b35449a910",
							"quantity": 1
						},
						{
							"menu_item_uuid": "1393c80c-7480-4a0c-b04c-b0b35449a910",
							"quantity": 1
						}
					]
				]
			}
		]
	}
```

The output parameters of VenueNext would include details pertaining to discount, taxes, total amount, payment and tips details.

Output:
```
	{
		"discount_amount_in_cents": null,
		"discount_rate": null,
		"service_charge_in_cents": null,
		"tax_rate": 0.0,
		"tax_amount_in_cents": 69,
		"total_amount_in_cents": 1118,
		"tip_suggestions": [
			{
				"tip_amount_in_cents": 157,
				"tip_display": "Tip 15%"
			},
			{
				"tip_amount_in_cents": 210,
				"tip_display": "Tip 20%"
			},
			{
				"tip_amount_in_cents": 262,
				"tip_display": "Tip 25%"
			}
		],
		"nutritional_attributes": {
			"nutritional_values": []
		}
	}
``` 

New State (to support dining plans):

Payload:
```
    {
	    "stand_menu_uuid": "e3a0fcad-0baf-4569-a8ab-1bd73b8776ec",
	    "order_uuid": "9f11ec71-9345-4114-9bda-087365cdfc2a",
	    "order_menu_items": [
	        {
		        "menu_item_uuid": "a82a26be-7f15-4f8d-9495-aa6c212658f9",
		        "quantity": 1,
		        "payment_type": "disney_dining_plan",
		        "modifiers": [
		            [
		                {
			                 "menu_item_uuid": "1393c80c-7480-4a0c-b04c-b0b35449a910",
			                 "quantity": 1,
			                 "payment_type": "disney_dining_plan"
		                },
		                {
			                 "menu_item_uuid": "1393c80c-7480-4a0c-b04c-b0b35449a910",
			                 "quantity": 1,
			                 "payment_type": "disney_app"
		                }
		            ]
		        ]
	        }
	    ]
    }
```   

Output:
```
	{
		"discount_amount_in_cents": null,
		"discount_rate": null,
		"service_charge_in_cents": null,
		"tax_rate": 0.0,
		"tax_amount_in_cents": 69,
		"total_amount_in_cents": 1118,
		"totals_with_payment_types": [{
		        "payment_type": "disney_dining_plan",
		        "tax_amount_in_cents": 34,
		        "total_amount_in_cents": 559
	        },
	        {
		        "payment_type": "disney_app",
		        "tax_amount_in_cents": 34,
		        "total_amount_in_cents": 559
	        }
	    ],
		"tip_suggestions": [
			{
				"tip_amount_in_cents": 157,
				"tip_display": "Tip 15%"
			},
			{
				"tip_amount_in_cents": 210,
				"tip_display": "Tip 20%"
			},
			{
				"tip_amount_in_cents": 262,
				"tip_display": "Tip 25%"
			}
		],
		"nutritional_attributes": {
			"nutritional_values": []
		}
	}
``` 
### Paramters required to add dine plans 

The input parameter required to add dine plan will differentiate between the items covered by dine plan by `items[].type`.

### Example
Sample Payload

```
{
	storeVNId: "e3a0fcad-0baf-4569-a8ab-1bd73b8776ec",
	orderVNId: "9f11ec71-9345-4114-9bda-087365cdfc2a",
	items: [
		{
			itemVNId: "a82a26be-7f15-4f8d-9495-aa6c212658f9",
			type: "disney_app",
			modifiers:[
				{
					itemVNId: "1393c80c-7480-4a0c-b04c-b0b35449a910",
					type: "disney_app"
				}
			]
		},
		{
			itemVNId: "1393c80c-7480-4a0c-b04c-b0b35449a910",
			type: "disney_dining_plan",
			modifiers:[
				{
					itemVNId: "1393c80c-7480-4a0c-b04c-b0b35449a972",
					type: "disney_dining_plan"
				}
			]
		},
		{
			itemVNId: "1393c80c-7480-4a0c-b04c-z0b35449x912",
			type: "disney_dining_plan"
		}
	]
}

```

The output paramter of the dine plan includes `totalsWithPayments` and `totalAmountInCents`.

`totalsWithPayments`: returns the total of the order (including the ones covered by a dining plan).

`totalAmountInCents`: returns the total of the covered items.

Sample Response

```
{
	discountAmountInCents: null,
	discountRate: null,
	serviceChargeInCents: null,
	taxRate: 0.0,
	totalTaxAmountInCents: 69,
	totalTaxAmount: 0.69,
	diningPlanCoveredAmountInCents: "559",
	totalAmountInCents: 1118,
	totalAmount: 11.18, 
	totalsWithPayments:[
		{
			paymentType: "disney_app",
			taxAmountInCents: 34,
			taxAmount: "0.34",
			diningPlanCoveredAmountInCents: "559",
			totalAmountInCents: "559",
			totalAmount: "5.59"
		},
		{
			paymentType: "disney_dining_plan",
			taxAmountInCents: "34",
			taxAmount: "0.34",
			diningPlanCoveredAmountInCents: "0"
			totalAmountInCents: "559",
			totalAmount: "5.59"
		}
	],
	tipSuggestions:[
		{
			tipAmountInCents: "157",
			tipAmount: "1.57",
			tipDisplay: "Tip 15%"
		},
		{
			tipAmountInCents: "210",
			tipAmount: "2.10",
			tipDisplay: "Tip 20%"
		},
		{
			tipAmountInCents: "262",
			tipAmount: "2.62",
			tipDisplay: "Tip 25%"
		}
	]
}
```
### Reference
[https://wiki.nge.wdig.com/display/NGE/MOO+-+Get+Order+Total+API](https://wiki.nge.wdig.com/display/NGE/MOO+-+Get+Order+Total+API)
