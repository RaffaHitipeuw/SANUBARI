import numpy as np
from scipy.signal import welch, find_peaks, windows

def apply_windowing(signal, window_type='hann'):

    if window_type == 'hann':
        win = windows.hann(len(signal))
    elif window_type == 'hamming':
        win = windows.hamming(len(signal))
    elif window_type == 'blackman':
        win = windows.blackman(len(signal))
    else:
        win = np.ones(len(signal))
    return signal * win

def mature_harmonic_rejection(psd, freqs, peak_hz, threshold=0.15):

    harmonics = [2 * peak_hz, 3 * peak_hz]
    is_harmonic = False

    for h in harmonics:
        if h > freqs[-1]: continue

        h_mask = (freqs >= h - 0.1) & (freqs <= h + 0.1)
        if not np.any(h_mask): continue

        h_peak = np.max(psd[h_mask])
        main_peak = np.max(psd[(freqs >= peak_hz - 0.1) & (freqs <= peak_hz + 0.1)])

        if h_peak > threshold * main_peak:

            sub_h = peak_hz / 2.0
            if sub_h >= 0.7: # Still in pulse range
                sub_mask = (freqs >= sub_h - 0.1) & (freqs <= sub_h + 0.1)
                if np.any(sub_mask):
                    sub_peak = np.max(psd[sub_mask])
                    if sub_peak > 0.3 * main_peak:
                        is_harmonic = True
                        break
    return is_harmonic

def respiratory_interference_analysis(signal, fps):

    n = len(signal)
    freqs, psd = welch(signal, fs=fps, nperseg=n)

    resp_mask = (freqs >= 0.1) & (freqs <= 0.5)
    pulse_mask = (freqs >= 0.7) & (freqs <= 3.0)

    if not np.any(resp_mask) or not np.any(pulse_mask):
        return 0.0

    resp_power = np.sum(psd[resp_mask])
    pulse_power = np.sum(psd[pulse_mask])

    ratio = resp_power / (pulse_power + 1e-9)
    return float(ratio)
