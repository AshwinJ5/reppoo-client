import { useEffect, useState } from "react";

export default function useWakeServer() {
    const [waking, setWaking] = useState(true);

    useEffect(() => {
        const alreadyAwake = sessionStorage.getItem("serverAwake");

        if (alreadyAwake) {
            setWaking(false);
            return;
        }

        let interval: any;

        const pingServer = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/health`, {
                    cache: "no-store",
                });

                if (res.ok) {
                    sessionStorage.setItem("serverAwake", "true");
                    setWaking(false);
                    clearInterval(interval);
                }
            } catch (err) {
                console.log(err);
            }
        };

        pingServer();
        interval = setInterval(pingServer, 2000);

        return () => clearInterval(interval);
    }, []);

    return waking;
}
