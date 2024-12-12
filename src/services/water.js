import waterCollection from "../db/models/Water.js";

export const createGlassWater = async (payload)=>{
 const glassWater = await waterCollection.create(payload);
 return glassWater;
}