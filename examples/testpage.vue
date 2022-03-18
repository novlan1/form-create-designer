<template>
<div>
    <form-create :rule="rule" v-model="fApi" :option="options"/>
    <div id="form-create-2"></div>
</div>
</template>

<script>
export default {
    data(){
        return {
            fApi:{},
            options:{
                onSubmit:(formData)=>{
                    alert(JSON.stringify(formData));
                },
                submitBtn:false,
                resetBtn:false
            },
            rule:[
                {
                    type:'el-button',
                    children:['方式1']
                },
                {
                    type:'el-button',
                    children:[{
                        type:'i',
                        class:'el-icon-check'
                    },' 方式2']
                },
                // {
                //     type: 'input',
                //     field: 'goods_name',
                //     title: '商品名称'
                // },
                // {
                //     type: 'datePicker',
                //     field: 'created_at',
                //     title: '创建时间'
                // }
            ]
        };
            
    },
    mounted() {
        // this.testFn();
    },
    methods: {
        testFn() {
            const root = document.getElementById('form-create-2');
            //fApi为表单api
            this.fApi = this.$formCreate(
            //表单生成规则
                [
                    this.$formCreate.maker.input('商品名称', 'goods_name', ''),
                    this.$formCreate.maker.date('创建时间', 'created_at')
                ],
                //组件参数配置
                {
                    el: root,
                    //表单提交事件
                    onSubmit: function (formData, fApi) {
                        fApi.btn.loading();
                    }
                });
        }
    }
};
</script>