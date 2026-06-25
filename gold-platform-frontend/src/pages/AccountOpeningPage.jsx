import { useState } from "react";
import { openAccount } from "../api/accounts";

export default function AccountOpeningPage() {

    const [loading, setLoading] = useState(false);

    const [status, setStatus] = useState(null);

    const handleOpenAccount = async () => {

        try {

            setLoading(true);

            const data = await openAccount();

            setStatus(data.status);

        } catch (error) {

            alert(
                error?.response?.data?.error ||
                "Unable to submit request"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex justify-center items-center">

            <div className="w-full max-w-xl bg-slate-900 rounded-3xl p-10 shadow-xl">

                <h1 className="text-3xl font-bold text-white mb-4">
                    Open Financial Account
                </h1>

                <p className="text-slate-400 mb-8">
                    Submit a request to activate your
                    wallet and gold trading account.
                </p>

                <button
                    onClick={handleOpenAccount}
                    disabled={loading}
                    className="w-full bg-yellow-500 text-black py-4 rounded-xl font-bold"
                >
                    {loading
                        ? "Submitting..."
                        : "Open Account"}
                </button>

                {status && (
                    <div className="mt-6 p-4 rounded-xl bg-slate-800">

                        <p className="text-white">
                            Status:
                        </p>

                        <p className="text-yellow-400 font-bold">
                            {status}
                        </p>

                    </div>
                )}

            </div>

        </div>
    );
}