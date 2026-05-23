# Donation JWT Auth & Validation Update TODO

## Steps:
- [x] Step 1: Update middleware/validateDonation.js with simple field existence/type checks (no DB).
- [x] Step 2: Update controller/donation.controller.js to use req.user._id for donor, remove redundant validations.
- [x] Step 3: Verify routes/auth unchanged (already perfect).
- [x] Step 4: Ready for Postman testing: signin → token → POST /donations with body + Bearer header → GET /donations/campaign/:id.
- [x] Complete: All updates done!

