import connectToDB from "../../../../database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
const authoptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        const { name, email } = user;
        console.log("Google user details:", { name, email });

        try {
          await connectToDB();
          const isUserExists = await User.findOne({ email });
          console.log("User exists:", isUserExists);

          if (!isUserExists) {
            const res = await fetch("http://localhost:3000/api/user", {
              method: "POST",
              headers: {
                'Content-Type': "application/json"
              },
              body: JSON.stringify({ name, email })
            });

            const resJson = await res.json();
            console.log("Response from /api/user:", resJson);

            if (resJson.success) {
              return user;
            } else {
              console.log("Failed to create user:", resJson.message);
              return false;
            }
          } else {
            return user;
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return user;
    }
  }
};

const handler = NextAuth(authoptions);
export { handler as GET, handler as POST };