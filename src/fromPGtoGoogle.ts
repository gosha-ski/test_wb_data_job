import { getWarehouses, IWarehousePG } from './dbConnection';
import { appendValues } from './index';

export async function fromPGtoGoogle(spreadsheetIds: string[]): Promise<void> {
	const result = await getWarehouses();
	const value = prepareForInsert(result);
	for (let spreadsheetId of spreadsheetIds) {
		await appendValues(spreadsheetId, 'A1', 'RAW', value);
	}
}

function prepareForInsert(result: IWarehousePG[]): string[][] {
	let value: string[][] = [];
	for (let warehouse of result) {
		const array: string[] = [];
		array.push(warehouse.box_delivery_and_storage_expr);
		array.push(warehouse.box_delivery_base);
		array.push(warehouse.box_delivery_liter);
		array.push(warehouse.box_storage_base);
		array.push(warehouse.box_storage_liter);
		array.push(warehouse.warehouse_name);
		value.push(array);
	}
	return value;
}

//fromPGtoGoogle(['1QaUtI-vNJ_NFl4Md0D8Hy2VQHRT6qTzH1UdAA0z0Fys', '1pBaHihGpUlHCAEsKjNCXR9krwKLdJyo5Btvf-2gqrfY']);
