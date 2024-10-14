import {Schema, model, models} from "mongoose";
import {Data} from "./types";

export const DataSchema = new Schema<Data>({
    trx_id: String,
    block_num: Number,
    block_time: String
}, {timestamps: true});

export const DataModel = models.userData || model("data", DataSchema);