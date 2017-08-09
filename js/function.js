$(document).ready(function(){

    /*var fragment = window.location.hash;
    if (fragment) {
        $('a[href="' + fragment + '"]').remodal().open();
    }*/
        $("#wrapper").toggleClass("toggled");
        var assgnmentUrl = 'https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d';
            $.getJSON(assgnmentUrl, function(result){
            $.each(result, function(i, field){
                var changeDateFormat = formatDate(field['due_at']);
                /* Append to SideBar */ 
                    $("#assgnmentList").append('<li class="assgnmentDetails"><a href="#'+field['id']+'" data-id="'+field['title']+'"><h4>'+field['title']+'</h4><h6 >due '+changeDateFormat+'</h6></a></li>');
                        var assignmentContent = '<h2 class="text-left">'+field['title']+'</h2> <h4 class="text-right">Due '+changeDateFormat+'</h4><p>'+field['description']+' </p>';
                 /* Append to the main container */       
                     $('#mainContainer').append('<div class="tab-pane" id="'+field['id']+'"><div class="container-fluid"><div class="row"><div class="col-lg-12"><ul class="nav nav-tabs"><li class="active"><a  href="#'+field['id']+'a" data-toggle="tab">Assignment</a></li><li><a href="#'+field['id']+'b" data-toggle="tab">Submission</a></li></ul><div class="tab-content "><div class="tab-pane active" id="'+field['id']+'a"><p>'+assignmentContent+'<p></div><div class="tab-pane studentInfo" id="'+field['id']+'b"></div></div></div></div></div></div></div>');

                     var assgnmentId = field['id'];
                     var studentInfoUrl = 'https://api.edmodo.com/assignment_submissions?assignment_id='+assgnmentId+'&assignment_creator_id=73240721&access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d';
                       $.getJSON(studentInfoUrl, function(sub_result){

                        /* Accordian for the Student Details */ 
                            var studentData = ' <div class="panel-group" id="accordion">';
                             $.each(sub_result, function(j, submissionData){
                                var studentId = submissionData['id'];
                                var studentName = submissionData['creator']['first_name']+' '+submissionData['creator']['last_name'];
                                var studentImg = submissionData['creator']['avatars']['small'];
                                var studentAssContent = submissionData['content'];
                                 var submittedDate = formatDate(submissionData['submitted_at']);
                                 studentData += '  <div class="panel panel-default">          <div class="panel-heading accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" data-target="#'+studentId+'">            <h4 class="panel-title"><div class="row">        <div class="col-xs-2">            <img src="'+studentImg+'" style="height:100px; margin-left:0px;" />        </div>        <div class="col-xs-6">              <h3>'+studentName+'</h3>            <h5> Turned in '+submittedDate+'</h5>        </div>    </div></h4>         </div>          <div id="'+studentId+'" class="panel-collapse collapse">            <div class="panel-body">              <p>'+studentAssContent+'</p>            </div>          </div>        </div>         ';
                            });
                             studentData +='</div>';
                              $('#'+assgnmentId+'b').append(studentData);
                        });
            });
        });
    });
    $('#assgnmentList').on('click','a',function(e){
        e.preventDefault();
        var assgnName = $(this).attr('data-id');
        assgnName = assgnName.replace(/\s+/g, '');
        window.location.hash = assgnName;
        $(this).tab('show')
    });
    /* Change Date Format */
        function formatDate(date) {
         var d = new Date(date),
            locale = "en-us",
            month = d.toLocaleString(locale, { month: "short" }),
            day = '' + d.getDate(),
            year = d.getFullYear();
            var finalDate = month+' '+day+', '+year;
            return finalDate;
        }
     $(document).ready(function(){
        var date_input=$('input[name="assgnDate"]'); //our date input has the name "date"
        var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
        date_input.datepicker({
            format: 'mm/dd/yyyy',
            container: container,
            todayHighlight: true,
            autoclose: true,
        })

        $('#sbtfrmData').click(function(){
           $('#myModalHorizontal').modal('toggle');
            var assgnTitle = $('#assgnTitle').val();
            var assgnDate = $('#assgnDate').val();
            var changeDateFormat = formatDate(assgnDate);
            var assgnDescription = $('#assgnDescription').val();
            if(assgnTitle!='' && changeDateFormat!=''){
            var assgnId = Math.floor(Math.random() * 20);    
            var assignmentContent = '<h2 class="text-left">'+assgnTitle+'</h2> <h4 class="text-right">Due '+changeDateFormat+'</h4><p>'+assgnDescription+' </p>';
            $("#assgnmentList").append('<li class="assgnmentDetails"><a href="#'+assgnId+'"><h4>'+assgnTitle+'</h4><h6 >due '+changeDateFormat+'</h6></a></li>');
                }

            $('#mainContainer').append('<div class="tab-pane" id="'+assgnId+'"><div class="container-fluid"><div class="row"><div class="col-lg-12"><ul class="nav nav-tabs"><li class="active"><a  href="#'+assgnId+'a" data-toggle="tab">Assignment</a></li><li><a href="#'+assgnId+'b" data-toggle="tab">Submission</a></li></ul><div class="tab-content "><div class="tab-pane active" id="'+assgnId+'a"><p>'+assignmentContent+'<p></div><div class="tab-pane studentInfo" id="'+assgnId+'b"></div></div></div></div></div></div></div>');

             $('#assgnTitle').val('');
             $('#assgnDate').val('');
             $('#assgnDescription').val('');
            

        });
    });