import type { APIRoute } from 'astro';
import Mailjet from 'node-mailjet';

// Get credentials from environment variables
const MAILJET_API_KEY = process.env.MAILJET_API_KEY || 'your_mailjet_api_key';
const MAILJET_SECRET_KEY = process.env.MAILJET_SECRET_KEY || 'your_mailjet_secret_key';
const MAILJET_LIST_ID = process.env.MAILJET_LIST_ID || 'your_mailjet_list_id'; // The ID of your contact list in Mailjet

export const post: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { email } = data;
    
    // Validate email
    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid email address',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    // Connect to Mailjet API
    const mailjet = Mailjet.apiConnect(
      MAILJET_API_KEY,
      MAILJET_SECRET_KEY
    );
    
    try {
      // Add contact to list
      const result = await mailjet
        .post('contactslist', { version: 'v3' })
        .id(MAILJET_LIST_ID)
        .action('managecontact')
        .request({
          Properties: { 
            Name: email.split('@')[0] // Using part of the email as a name
          },
          Action: "addnoforce",
          Email: email
        });
      
      console.log('Mailjet response:', result.body);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Subscription successful',
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (mailjetError) {
      console.error('Mailjet API error:', mailjetError);
      
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Failed to subscribe with email service',
          error: mailjetError instanceof Error ? mailjetError.message : 'Unknown error',
        }),
        {
          status: 502, // Bad Gateway for external service failure
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  } catch (error) {
    console.error('Subscription error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred while processing your subscription',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}; 