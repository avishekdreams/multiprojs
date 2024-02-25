import { useEffect, useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);
    const secs = Math.floor(count % 60);
    const mins = Math.floor(count / 60);
    useEffect(() => {
        const id = setInterval(function () {
            setCount((e) => e + 1);
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div>
            Countdown Starts: {mins < 10 && '0'}{mins}:{secs < 10 && '0'}{secs}
        </div>
    )
}

