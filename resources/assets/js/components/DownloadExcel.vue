<template>
   <a
      href="#"
      :id="id_name"
      @click="generate_excel">
      <slot>
         Download Excel
      </slot>
   </a>
</template>

<script>
   export default {
      name: 'download-excel',
      props: {
         'data': {
            type: Array,
            required: true
         },
         'fields': {
            type: Object,
            required: false
         },
         'labels': {
            type: Object,
            required: false
         },
         'name': {
            type: String,
            default: "data.xls"
         },
      },
      //template: ``,
      data: function () {
         return {
            animate: true,
            animation: '',
         }
      },
      created: function () {
      },
      computed: {
         id_name: function () {
            var now = new Date().getTime();
            return 'export_' + now;
         }
      },
      methods: {
         emitXmlHeader: function () {
            var headerRow = '<ss:Row>\n';
            for (var colName in this.fields) {
               headerRow += '  <ss:Cell>\n';
               headerRow += '    <ss:Data ss:Type="String">';
               headerRow += (this.labels[colName] || colName) + '</ss:Data>\n';
               headerRow += '  </ss:Cell>\n';
            }
            headerRow += '</ss:Row>\n';
            //'<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n' +
            return '<?xml version="1.0"?>\n' +
               '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n' +
               'xmlns:o="urn:schemas-microsoft-com:office:office"\n' +
               'xmlns:x="urn:schemas-microsoft-com:office:excel"\n' +
               'xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\n' +
               'xmlns:html="http://www.w3.org/TR/REC-html40">\n' +
               '<ss:Worksheet ss:Name="Sheet1">\n' +
               '<ss:Table>\n\n' + headerRow;
         },

         emitXmlFooter: function () {
            return '\n</ss:Table>\n' +
               '</ss:Worksheet>\n' +
               '</ss:Workbook>\n';
         },

         jsonToSsXml: function (jsonObject) {
            var row;
            var col;
            var xml;
            //console.log(jsonObject);
            var data = typeof jsonObject != "object"
               ? JSON.parse(jsonObject)
               : jsonObject;

            xml = this.emitXmlHeader();

            for (row = 0; row < data.length; row++) {
               xml += '<ss:Row>\n';

               for (col in data[row]) {
                  xml += '  <ss:Cell>\n';
                  xml += '    <ss:Data ss:Type="' + this.fields[col] + '">';
                  xml += String(data[row][col]).replace(/[^a-zA-Z0-9\s\-ñíéáóú\#\,\.\;\:ÑÍÉÓÁÚ@_]/g, '') + '</ss:Data>\n';
                  xml += '  </ss:Cell>\n';
               }

               xml += '</ss:Row>\n';
            }

            xml += this.emitXmlFooter();
            return xml;
         },
         generate_excel: function (content, filename, contentType) {
            var blob = new Blob([this.jsonToSsXml(this.data)], {
               'type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });

            var a = document.getElementById(this.id_name);
            a.href = window.URL.createObjectURL(blob);
            a.download = this.name;
         }
      }
   }
</script>
