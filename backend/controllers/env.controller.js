import dotenv from 'dotenv';
dotenv.config();
export const getSiteKey = async (req, res) => {
    try {
        const siteKey = process.env.TURNSTILE_SITE_KEY;

        // Check if the TURNSTILE_SITE_KEY exists
        if (!siteKey) {
            return res.status(404).json({
                success: false,
                message: "TURNSTILE_SITE_KEY not found",
            });
        }

        // Return the siteKey if it exists
        return res.status(200).json({
            success: true,
            siteKey: siteKey,
        });

    } catch (err) {
        console.error(`Error retrieving TURNSTILE_SITE_KEY: ${err.message}`);

        // Handle any unexpected errors gracefully
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message,
        });
    }
}