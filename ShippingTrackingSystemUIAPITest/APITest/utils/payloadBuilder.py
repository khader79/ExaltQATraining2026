def create_update_payload(tracking_id, stage_index, status, cause=""):
    return {
        "trackingId": tracking_id,
        "stageIndex": stage_index,
        "status": status,
        "cause": cause,
    }
