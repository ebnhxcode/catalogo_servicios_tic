<template>
    <nav aria-label="Page navigation">
        <ul class="pagination">
            <li :class="{ disabled: pagination.current_page == 1}">
                <a href="#!" class="btn btn-success" aria-label="Previous" @click="nextPrev($event, pagination.current_page-1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            <li v-for="page in pages" track-by="$index" :class="{ pro: pagination.current_page == page }">
                <span class="btn btn-success" v-if="page == '...'">{{page}}</span>
                <a href="#!" class="btn btn-success" v-if="page != '...'" @click="navigate($event, page)">{{page}}</a>
            </li>

            <li :class="{ disabled: pagination.current_page == pagination.last_page}">
                <a href="#!" class="btn btn-success" aria-label="Next" @click="nextPrev($event, pagination.current_page+1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
   export default {
      name: "paginators",
      props: ['pagination'],
      data () {
         return {
            pages: []
         }
      },
      ready () {
      },
      created () {
         //console.log(this.pagination); //está trayendo pagination
         let p = this.pagination;
         this.pages = this.generatePagesArray(p.current_page, p.total, p.per_page, 7);
      },

      methods: {
         navigate (ev, page) {
            ev.preventDefault();
            //console.log(page);
            this.$emit('navigate', page);
         },
         nextPrev (ev, page) {
            if (page == 0 || page == this.pagination.last_page + 1) {
               return;
            }
            this.navigate(ev, page);
         },
         generatePagesArray (currentPage, collectionLength, rowsPerPage, paginationRange){
            var pages = [];
            var totalPages = Math.ceil(collectionLength / rowsPerPage);
            var halfWay = Math.ceil(paginationRange / 2);
            var position;

            if (currentPage <= halfWay) {
               position = 'start';
            } else if (totalPages - halfWay < currentPage) {
               position = 'end';
            } else {
               position = 'middle';
            }

            var ellipsesNeeded = paginationRange < totalPages;
            var i = 1;
            while (i <= totalPages && i <= paginationRange) {
               var pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, totalPages);
               var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
               var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
               if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                  pages.push('...');
               } else {
                  pages.push(pageNumber);
               }
               i++;
            }
            return pages;
         },
         calculatePageNumber (i, currentPage, paginationRange, totalPages){
            var halfWay = Math.ceil(paginationRange / 2);
            if (i === paginationRange) {
               return totalPages;
            } else if (i === 1) {
               return i;
            } else if (paginationRange < totalPages) {
               if (totalPages - halfWay < currentPage) {
                  return totalPages - paginationRange + i;
               } else if (halfWay < currentPage) {
                  return currentPage - halfWay + i;
               } else {
                  return i;
               }
            } else {
               return i;
            }
         }
      },

      watch: {
         pagination () {
            //console.log('Estoy llegando al watch');
            let p = this.pagination;
            this.pages = this.generatePagesArray(p.current_page, p.total, p.per_page, 7);
         }
      },
   }
</script>

<style scoped>

</style>