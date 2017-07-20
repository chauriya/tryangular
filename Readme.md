Get Order Total
=======

Overview:
==========

This document describes Get Order Total API used for "Mobile Ordering Orchestration" service.

This API will take a list of items from the mobile client with the guest orders including guest's dining plan item pass it to venue next and will receive two prices of order total, one price which will represents the total of the order (including the ones covered by a dining plan) and other price which represents the total of the covered items.

VenueNext:
===========

It is the third party service which receives a request including order ID and store ID from mobile client which stores all items on its side with prices and maps the uuid received from mobile ordering orchestration service to the linked price. The VN does the calculation (sum) and taxes and returns the total prices, discounts, tips and sort out things on the VN response (Get total order api) and differentiates between the items consideration covered by dining plan.

Input and Output Parameters of VenueNext:
=========================================

The input parameters received from mobile ordering orchestration service comprises of store ID, order ID and item ID of VN such as storeVNId, orderVNId and different items details such as itemVNId and type.

The output parameters of VenueNext would include details pertaining to discount, taxes, total amount, payment and tips details. 

Paramters required to add dine plans/ input output modification required for dine plan:
=======================================================================================

The input parameter required to add dine plan will differentiate between the items covered by dine plan by `items[].diningPlanEligible`

The output paramter of the dine plan includes `diningPlanCoveredAmountInCents` and `totalAmountInCents`.

`diningPlanCoveredAmountInCents`: returns the total of the order (including the ones covered by a dining plan).

`totalAmountInCents`: returns the total of the covered items.



