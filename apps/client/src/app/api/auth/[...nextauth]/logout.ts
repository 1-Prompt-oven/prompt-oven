import { getServerSession } from "next-auth"
import { authOptions } from "./authOption"
import { logoutAuthMember } from "@/action/auth/memberManageAction"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {


  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const response = await logoutAuthMember({
      Authorization: `Bearer ${session.user.accessToken}`,
      Refreshtoken: session.user.refreshToken ?? "",
    });

    if (response.isSuccess) {
      return res.status(200).json({ success: true });
    } else {
      throw new Error(response.message || "Logout failed on server.");
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "An unknown error occurred." });
  }
}

