Get Order Total
=======

### Overview

This document describes Get Order Total API used for "Mobile Ordering Orchestration" service.

This API will take a list of items from the mobile client with the guest orders including guest's dining plan item pass it to venue next and will receive two prices of order total, one price which will represents the total of the order (including the ones covered by a dining plan) and other price which represents the total of the covered items.

### VenueNext

It is the third party service which receives a request including order ID and store ID from mobile client which stores all items on its side with prices and maps the uuid received from mobile ordering orchestration service to the linked price. The VN does the calculation (sum) and taxes and returns the total prices, discounts, tips and sort out things on the VN response (Get total order api) and differentiates between the items consideration covered by dining plan.

Input and Output Parameters of VenueNext
=========================================

The input parameters received from mobile ordering orchestration service comprises of store ID, order ID and item ID of VN such as storeVNId, orderVNId and different items details such as itemVNId and type.

This service retrieves a valid SWID after authenticating and validating the user request.

###Example
Sample Request
	
	POST https://disney-production-stadium.venuenext.net/v4/orders/total.json

Headers:

	- Content-Type: application/x-www-form-urlencoded

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

The output parameters of VenueNext would include details pertaining to discount, taxes, total amount, payment and tips details. 

Paramters required to add dine plans/ input output modification required for dine plan
=======================================================================================

The input parameter required to add dine plan will differentiate between the items covered by dine plan by `items[].diningPlanEligible`

The output paramter of the dine plan includes `diningPlanCoveredAmountInCents` and `totalAmountInCents`.

`diningPlanCoveredAmountInCents`: returns the total of the order (including the ones covered by a dining plan).

`totalAmountInCents`: returns the total of the covered items.



