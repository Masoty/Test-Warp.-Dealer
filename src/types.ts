

export interface ResponseData {
    action_trace: {
        trx_id: string
    },
    block_time: string,
    block_num: number
}

export interface Data {
    trx_id: string
    block_time: string
    block_num: number
}
