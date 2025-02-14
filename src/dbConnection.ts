import { knex } from 'knex';

const config = {
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		port: 8080,
		user: 'postgres',
		database: 'postgres',
		password: 'postgres',
	},
};

export const knexInstance = knex(config);

interface IWarehouse {
	boxDeliveryAndStorageExpr: string;
	boxDeliveryBase: string;
	boxDeliveryLiter: string;
	boxStorageBase: string;
	boxStorageLiter: string;
	warehouseName: string;
}
export interface IWarehousePG {
	box_delivery_and_storage_expr: string;
	box_delivery_base: string;
	box_delivery_liter: string;
	box_storage_base: string;
	box_storage_liter: string;
	warehouse_name: string;
}

function warehouseMapper(array: IWarehouse[]): IWarehousePG[] {
	const result: IWarehousePG[] = [];
	for (let item of array) {
		const warehouse = {
			box_delivery_and_storage_expr: item.boxDeliveryAndStorageExpr,
			box_delivery_base: item.boxDeliveryBase,
			box_delivery_liter: item.boxDeliveryLiter,
			box_storage_base: item.boxStorageBase,
			box_storage_liter: item.boxStorageLiter,
			warehouse_name: item.warehouseName,
		};
		result.push(warehouse);
	}
	return result;
}

export async function insertWarehouse(warehouses: IWarehouse[]): Promise<void> {
	const mappedWarehouses = warehouseMapper(warehouses);
	await knexInstance('warehouses').insert(mappedWarehouses);
	//console.log('inserted');
}

export async function getWarehouses() {
	const warehouses = await knexInstance('warehouses').select('*');
	return warehouses;
}

async function createTableWarehouses() {
	const table = await knexInstance.schema.createTable('warehouses', function (table) {
		table.string('box_delivery_and_storage_expr');
		table.string('box_delivery_base');
		table.string('box_delivery_liter');
		table.string('box_storage_base');
		table.string('box_storage_liter');
		table.string('warehouse_name');
	});
}
