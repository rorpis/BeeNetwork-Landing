import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WaitlistSubmission {
  firstName: string;
  lastName: string;
  email: string;
  specialty: string;
  currentSituation: string;
  additionalInfo: string | null;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { submission } = await req.json();
    
    console.log("Received waitlist submission:", submission);
    
    const emailResponse = await resend.emails.send({
      from: "PrivateClinicsNetwork Landing <onboarding@resend.dev>",
      to: ["rodrigo@keepmecompanyai.com", "eduardo@keepmecompanyai.com"],
      subject: "New Physician Waitlist Application",
      html: `
        <h1>New Physician Waitlist Application</h1>
        <h2>Contact Information</h2>
        <p><strong>Name:</strong> ${submission.firstName} ${submission.lastName}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        
        <h2>Professional Information</h2>
        <p><strong>Specialty:</strong> ${submission.specialty}</p>
        <p><strong>Current Situation:</strong> ${submission.currentSituation}</p>
        
        ${submission.additionalInfo ? `
        <h2>Additional Information</h2>
        <p>${submission.additionalInfo}</p>
        ` : ''}
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-waitlist-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
