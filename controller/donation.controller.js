import mongoose from "mongoose";
import Donation from "../model/donation.model.js";
import campaignModel from "../model/campaign.model.js"; 
import Notification from "../model/notification.model.js";


export const createDonation = async (req, res) => {
  try {
    const { campaign, amount, purpose, message, isAnonymous } = req.body;

    const donation = await Donation.create({
      donor: req.user._id,
      campaign,
      amount,
      purpose,
      message,
      isAnonymous,
      status: "pending"
    });
    await Notification.create({
       user: req.user._id,
       title: "تم إنشاء التبرع",
      message: "التبرع قيد الانتظار ⏳"
            });

    res.status(201).json({
      message: "تم إنشاء التبرع (pending)",
      donation
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const confirmDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: "التبرع غير موجود" });
    }

    // ✅ تحقق إنه مش متأكد قبل كده
    if (donation.status === "confirmed") {
      return res.status(400).json({ message: "تم تأكيد التبرع بالفعل" });
    }

    donation.status = "confirmed";
    await donation.save();
   

    //  التعديل  هنا 
    await campaignModel.findByIdAndUpdate(donation.campaign, {
      $inc: { collectedAmount: donation.amount }
    });
          await Notification.create({
          user: donation.donor,
          title: "تم تأكيد التبرع 🎉",
           message: "شكراً لدعمك ❤️"
              });
    res.json({ message: "تم تأكيد التبرع", donation });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const refundDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: "التبرع غير موجود" });
    }

    // ❌ لو مش confirmed أصلاً مينفعش ترجعيه
    if (donation.status !== "confirmed") {
      return res.status(400).json({ message: "لا يمكن استرجاع هذا التبرع" });
    }

    // ✅ تحديث الحالة
    donation.status = "refunded";
    await donation.save();

    // 🔥 تقليل المبلغ من الحملة
    await campaignModel.findByIdAndUpdate(donation.campaign, {
      $inc: { collectedAmount: -donation.amount }
    });

    // 🔔 إشعار
    await Notification.create({
      user: donation.donor,
      title: "تم استرجاع التبرع",
      message: "تم إرجاع التبرع الخاص بك 💸"
    });

    res.json({ message: "تم استرجاع التبرع", donation });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// export const confirmDonation = async (req, res) => {
//   try {
//     const donation = await Donation.findById(req.params.id);

//     if (!donation) {
//       return res.status(404).json({ message: "التبرع غير موجود" });
//     }

//     donation.status = "confirmed";
//     await donation.save();

//     res.json({ message: "تم تأكيد التبرع", donation });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// استرجاع التبرع
// export const refundDonation = async (req, res) => {
//   try {
//     const donation = await Donation.findById(req.params.id);

//     if (!donation) {
//       return res.status(404).json({ message: "التبرع غير موجود" });
//     }

//     donation.status = "refunded";
//     await donation.save();

//     res.json({ message: "تم استرجاع التبرع", donation });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// جلب التبرعات المؤكدة لحملة معينة
export const getCampaignDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      campaign: req.params.campaignId,
      status: "confirmed"
    }).populate("donor", "name");

    const result = donations.map(d => ({
      name: d.isAnonymous ? "متبرع مجهول" : d.donor.name,
      amount: d.amount,
      message: d.message
    }));

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};
  export const getMyDonations = async (req, res) => {
    try {
      const donations = await Donation.find({
        donor: req.user._id
      })
        .populate("campaign", "title") // اسم الحملة
        .sort({ createdAt: -1 }); // الأحدث الأول
  
      res.json({
        count: donations.length,
        donations
      });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


