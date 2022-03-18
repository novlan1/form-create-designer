const label = '测试组件';
const name = 'test-comp';

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
            children: [
                {
                    'type': 'span',
                    'title': '文字',
                    drag: true,
                    dragBtn: true,
                    inside: true,
                    'native': false,
                    slot: 'b',
                    'children': [
                        '这是一段文字'
                    ],
                    '_fc_drag_tag': 'span',
                    'hidden': false,
                    'display': true
                },
                {
                    'type': 'span',
                    'title': '文字',
                    drag: true,
                    dragBtn: true,
                    inside: true,
                    'native': false,
                    slot: 'c',
                    'children': [
                        '这是一段文字'
                    ],
                    '_fc_drag_tag': 'span',
                    'hidden': false,
                    'display': true
                },
            ],
        };
    },
    props() {
        return [
            {
                type: 'input',
                field: 'aaa',
                title: 'aaa'
            },
            {
                type: 'Struct',
                field: 'test',
                title: 'ruleChildren'
            }
        ];
    }
};