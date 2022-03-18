const label = '表格';
const name = 'table-box';
const columnData = [
    {
        'field': 'province',
        'fieldName': '省份',
        'width': 100,
        'isSlot': true
    },
    {
        'field': 'city',
        'fieldName': '城市',
        'width': 100,
        'isSlot': true

    },
    {
        'field': 'storeName',
        'fieldName': '门店名称',
        'width': 150
    },
    {
        'field': 'addr',
        'fieldName': '门店地址',
        'width': 150
    },
    {
        'field': 'brandName',
        'fieldName': '所属品牌',
        'width': 150
    },
    {
        'field': 'channels',
        'fieldName': '所属渠道',
        'width': 150
    },
    {
        'field': 'serveType',
        'fieldName': '所属小类',
        'width': 150
    },
    {
        'field': 'category',
        'fieldName': '所属大类',
        'width': 150
    }
];
const tableData = [
    {
        'merchantId': 'tip5fdf31c755dXrR',
        'storeName': '小蚂蚁测试4(线上店)',
        'province': '广东',
        'city': '深圳',
        'addr': '科苑路科兴科学园D栋',
        'category': '餐饮美食',
        'serveType': '正餐',
        'brandId': 'b1602234034',
        'brandName': '小蚂蚁测试4',
        'mgrChannels': [
            '1002'
        ],
        'channels': '1002',
        'joinActs': [],
        'isEnrRes': '否',
        'historyAct': '',
        'historyGame': ''
    },
];

function getSlots() {
    const fieldList = columnData.map(item => item.field);
    const len = tableData.length;
    const res = [];
    for (let i=0;i<fieldList.length;i++) {
        for (let j = 0;j<len;j++) {
            res.push({
                slot: `${j}-${i}`,
                // 'type': 'span',
                // 'title': '',
                // 'native': false,
                // 'children': [
                //     '这是一段文字'
                // ],
                // '_fc_drag_tag': 'span',
                // 'hidden': false,
                // 'display': true
            });
        }
    }
    return res;
   
    
}
// console.log('getSlots',getSlots());

export default {
    icon: 'icon-span',
    label,
    name,
    drag: true,
    dragBtn: true,
    rule() {
        return {
            type: name,
            native: false,
            props: {
                columnData,
                tableData
            },
            children: getSlots() ,
        };
    },
    props() {
        return [
            {
                'type': 'number',
                'field': 'total',
                'title': '总条数',
                'value': 10
            },
            {
                'type': 'Struct',
                'title': '表格列信息',
                'field': 'columnData',
                'value': columnData
            },
            {
                'type': 'Struct',
                'title': '表格列数据',
                'field': 'tableData',
                'value': tableData
            }
        ];
    }
};