import axios from "axios";
import {DataModel} from "./schema";
import connectionDB from "./mongo";
import {Data, ResponseData} from "./types";


async function getData(): Promise<ResponseData[]> {

    const url = 'https://eos.greymass.com/v1/history/get_actions'

    const data = {"account_name": "eosio", "pos": -1, "offset": -100}

    const res = await axios.post(url, data)

    return res.data.actions

}

async function writeData(data: ResponseData[]) {

    for (const res_data of data) {


        const write_data: Data = {
            trx_id: res_data.action_trace.trx_id,
            block_time: res_data.block_time,
            block_num: res_data.block_num
        }

        const checkWriteInDB = await DataModel.findOne({trx_id: write_data.trx_id})

        // Если така запись есть, то значит что все последующие тоже есть, потому останавливаем итерацию
        if (checkWriteInDB) {
            break
        }

        await DataModel.create(write_data)

        console.log(`Записано: ${write_data.trx_id}`)

    }

}


async function main() {

    console.log('Start Parse')

    await connectionDB()

    const data = await getData()

    await writeData(data)

}

setInterval(() => {
    main()
}, 60_000)







