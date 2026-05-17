from dataclasses import dataclass

@dataclass
class RPPGConfig:

    BUFFER_SIZE: int = 150

    FPS_TARGET: float = 30.0

    MIN_FRAMES: int = 60

    CALIBRATION_FRAMES: int = 150

    RPPG_ALGO: str = "POS"

    BPM_LOW: float = 42.0

    BPM_HIGH: float = 200.0

    RESP_LOW: float = 0.10
    RESP_HIGH: float = 0.50

    SQI_HARD_GATE: float = 20.0

    SQI_DISPLAY_GATE: float = 10.0

    BASELINE_SQI_THRESHOLD: float = 45.0

    ARRHYTHMIA_SQI_GATE: float = 65.0

    AGREEMENT_SQI_PENALTY_BELOW: float = 0.50

    AGREEMENT_SQI_PENALTY_COEFF: float = 0.30

    DYN_WEIGHT_MIN: float = 0.3

    DYN_WEIGHT_MAX: float = 3.0

    DYN_WEIGHT_NORM_MAX: float = 0.75

    FUSION_OUTLIER_THRESHOLD: float = 10.0

    REGULARITY_HARD_GATE: float = 0.0

    FFT_DOMINANCE_STRONG: float = 0.30

    FFT_DOMINANCE_MEDIUM: float = 0.15
    FFT_DOMINANCE_WEAK: float = 0.08

    BPM_VELOCITY_SOFT_LIMIT: float = 5.0

    BPM_VELOCITY_DAMP_ALPHA: float = 0.20

    SESSION_CONF_WEIGHT_SQI: float = 0.40

    SESSION_CONF_WEIGHT_AGREEMENT: float = 0.30

    SESSION_CONF_WEIGHT_TEMPORAL: float = 0.20

    SESSION_CONF_WEIGHT_MOTION: float = 0.10

    SESSION_CONF_CONSISTENCY_WINDOW: int = 60

    SESSION_CONF_AGREEMENT_FLOOR: float = 0.4

    EXPOSURE_DRIFT_WARN: float = 8.0

    EXPOSURE_DRIFT_FREEZE: float = 20.0

    EXPOSURE_DRIFT_SQI_PENALTY: float = 0.35

    EXPOSURE_DRIFT_WEIGHT_MULT: float = 0.45

    SNR_KILL_THRESHOLD: float = 20.0

    SNR_KILL_WEIGHT: float = 0.08

    AGREEMENT_KILL_BELOW: float = 0.55

    AGREEMENT_KILL_MULT: float = 0.10

    AGREEMENT_STD_K: float = 12.0

    AGREEMENT_DEV_K: float = 9.0

    BPM_PLAUSIBLE_LOW: float = 42.0
    BPM_PLAUSIBLE_HIGH: float = 140.0

    SINGLE_ROI_SQI_MULT: float = 1.00

    HARMONIC_SUSPECT_MULT: float = 0.05

    ROI_MIN_AGREEMENT_FACTOR: float = 0.20

    STABLE_LOCK_SECONDS: float = 5.0

    STABLE_LOCK_BPM_STD: float = 5.0

    STABLE_HOLD_ALPHA: float = 0.05

    ROI_BAD_STREAK_LIMIT: int = 120

    ROI_BAD_SQI_THRESH: float = 15.0

    ROI_REHAB_FRAMES: int = 30

    FFT_WINDOW_SEC: float = 4.0

    FFT_WINDOW_VOTE_TOL: float = 0.10

    FFT_HISTORY_OVERRIDE: float = 0.18

    ROI_TEMPORAL_SPIKE_BPM: float = 15.0

    ROI_TEMPORAL_SPIKE_MULT: float = 2.0

    MOTION_ENTER_THRESHOLD: float = 2.8

    MOTION_EXIT_THRESHOLD: float = 1.8

    BPM_HOLDOVER_SEC: float = 5.0

    MOTION_GRACE_FRAMES: int = 12

    BPM_EMA_ALPHA: float = 0.20

    BPM_MEDIAN_WINDOW: int = 11

    BPM_MAX_JUMP: float = 25.0

    TEMPORAL_BPM_MAX_JUMP_3FRAMES: float = 15.0

    TEMPORAL_HISTORY_LEN: int = 7

    CLUSTER_DISTANCE_BPM: float = 14.0

    MIN_CLUSTER_WEIGHT: float = 0.20

    CALIBRATION_SQI_FLOOR: float = 40.0

    ROI_BRIGHTNESS_MIN: float = 45.0

    ROI_BRIGHTNESS_MAX: float = 205.0

    PEAK_TEMPORAL_BONUS: float = 0.25

    PEAK_TEMPORAL_TOL_HZ: float = 0.12

    TEMPORAL_STABILITY_WINDOW: int = 10

    SQI_WEIGHT_SNR:          float = 0.35
    SQI_WEIGHT_REGULARITY:   float = 0.25
    SQI_WEIGHT_TEMPORAL:     float = 0.15
    SQI_WEIGHT_PEAK_CONSIST: float = 0.15
    SQI_WEIGHT_VARIANCE:     float = 0.10
    SQI_PENALTY_WEIGHT:      float = 0.40
    SQI_MAX_MOTION_PENALTY:  float = 0.50
    SQI_MAX_LIGHTING_PENALTY: float = 0.30
    SQI_MAX_FFT_PENALTY:     float = 0.25

cfg = RPPGConfig()
