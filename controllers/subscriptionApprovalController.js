import {
  getPendingApprovals,
  getApprovalHistory,
  updateApprovalStatus,
  insertApprovalHistory
} from "../services/subscriptionApprovalServices.js";

export const fetchPendingApprovals = async (req, res) => {
  try {
    const pending = await getPendingApprovals();
    res.json(pending);
  } catch (err) {
    console.error("❌ Fetch Pending Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchApprovalHistory = async (req, res) => {
  try {
    const history = await getApprovalHistory();
    res.json(history);
  } catch (err) {
    console.error("❌ Fetch History Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const submitApproval = async (req, res) => {
  try {
    const {
      subscriptionNo,
      approval,
      note,
      approvedBy,
      requestedOn,
    } = req.body;

    // Update Subscription Table
    await updateApprovalStatus({ subscriptionNo, approval });

    // Insert into APPROVAL HISTORY
    await insertApprovalHistory({
      subscriptionNo,
      approval,
      note,
      approvedBy,
      requestedOn
    });

    res.json({ success: true, message: "Approval Updated Successfully" });
  } catch (err) {
    console.error("❌ Submit Approval Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
