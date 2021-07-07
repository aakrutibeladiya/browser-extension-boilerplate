# Tasks or other info

api response structure

```javascript
 res: {
  success: 1||0, // this is only to check that connection was successful.
  data:[]||{}||string|| boolean //if something is for acknowledgment only then boolean
  error:0 || {
    errorMessage : errorKey // can be validation error
  }
}
```

list of required apis

1. all_stores
2. top_offers
3. store_details with store_coupon list
4. member_account_info (with refer and earn data) single api for all user data
5. extension settings :

```javascript
res data: {
  referral_enabled,
    referral_percent,
    referral_validity,
    cnf_currency_name,
    top_stores_domains,
}
```

6. inject side ==> checkOut_metadata

7. apply coupon tested stores

- gearbest => checkout url ==> product "AMAZFIT Stratos / Pace 2 Smartwatch Global Version ( Xiaomi Ecosystem Product )"
- berrylook ==> was working before currently web page showing security issues
- floryday.com
- nike
- footlocker
- asos ==> AUGUST25 code is working
- tomtop
- chicme.com ==> CM2 code was working
- zaful ==> on remove code page is loading again
- myntra ==> optional ==> COMFY10 is working
  TODO:

1 : When cashback is activated and open a category page in new tab, it asks again to activate the cashback. Moreover store logo is missing @ https://prnt.sc/tp3cuo ==> this is on url or web page issue , value is correct on html code

2 : When a merchant is visited from the cashback website, it should show cashback activated confirmation popup. [it can be changed in config file currently set to 5 sec ]

3 : Cashback activated confirmation popup to be closed after N seconds on it's own.[SOLVED]

4 : When visited AJIO from the search result, and clicked on the activate cashback, it did not show confirmation message.

5 : Both corners can be made round, A button can be added, Proceed to Payment button to be added @ https://prnt.sc/tr4u6y [UI FIX]

6 : When store is searched and clicked on the shop now from search result page, it opens an image instead of the store.[SOLVED]

7 : Could not test the scenario of multiple coupon worked with highest discount retained at the last. Please share if you know any product to test this case. ==> try zaful

8 : on apply coupon success https://prnt.sc/tvjocs change test to best code

9 : apply coupon loader for last price compare function

##############################################################################################
date : 07-08-2020

## Extension Testing Version shared on 07-08-2020

1. AliExpress - cashback is disabled in the store, but still shows up a popup to activate the cashback and even after clicking Activate Cashback, it shows up again and again.
2. If visit any merchant page directly then, in extension drop-down, show Activate Cashabck button if cashback is not activated yet. And if cashback is activated from popup, then Show Cashback Activated with Trip ID as information text besides the store logo. https://prnt.sc/twlhyl [SOLVED : needs UI fix]
3. Show referral join FULL link @ https://prnt.sc/twlirq (Also correct the social share URLs accordingly) [SOLVED]
4. Confirmed amount calculation for both Reward & Cashback is incorrect @ https://prnt.sc/twlk1t[SOLVED]
5. Show a word as Cashback or Reward as applicable in Google search result page @ https://prnt.sc/twlkky [SOLVED]
6. http://cashbackos.ga/store/iherb-int/ - Coupon, even after the cashback is activate, if a merchant page is open directly it shows popup to activate the cashback [its same as ebates]
7. Top Offer Shop Now button behaviour is inconsistent and incorrect.[data issue]
8. When logout, website shows WP page to logout with confirmation [no solution ]
9. Click on any area of text, icon should copy the code. This should be done in ALL SCREENS @ https://prnt.sc/twlnfl [SOLVED]
10. AliExpress Cashback staus change in search result / Google search result is not showing up the cashback rate.
11. When user is on a product link and click on activate cashback, it should redirect back to same page. At the moment, it's taking him to the homepage @ https://www.ajio.com/outryt-women-high-rise-boot-cut-indigo-jeans/p/460540167_indigo 

## Notes : for testing 

- clear all cached data

- make sure cashback is enabled on admin for store to see popup on web. 
  
- user login is required to get apply coupon popup.
