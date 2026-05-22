import {useCallback, useRef, useState} from 'react';

/**
 * @typedef {Object} UseTimerApi
 * @property {number} seconds - Elapsed seconds value.
 * @property {function(): void} start - Starts timer if not running.
 * @property {function(): void} stop - Stops timer.
 * @property {function(): void} reset - Stops timer and resets seconds to 0.
 */

/**
 * Provides a simple interval-based timer API for gameplay.
 *
 * @returns {UseTimerApi}
 */
export const useTimer = () => {
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef(null);

    const start = useCallback(() => {
        if (intervalRef.current) return;

        intervalRef.current = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);
    }, []);

    const stop = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const reset = useCallback(() => {
        stop();
        setSeconds(0);
    }, [stop]);

    return {seconds, start, stop, reset};
};