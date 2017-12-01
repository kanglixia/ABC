const gulp = require('gulp');
const webserver = require('gulp-webserver');

gulp.task('webserver', () => {
    gulp.src('./')
        .pipe(webserver({
            host: 'localhost',
            port: 8080,
            livereload: true,
            open: true,
            fallback: 'index.html'
        }));
});
gulp.task('webserverr',function(){
    gulp.src('./')
        .pipe(webserver({
            host:'localhost',
            port: 8090,
            middleware:function(req,res){            
                if(req.url ==="/userinfo"){
                    var data = {
                        "name": '1511',
                        "class": "1511",
                        "sex":"女",
                        "age":18
                    }
                    res.writeHead(200, {
                        "Content-type": "text/json;charset=utf8",
                        "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(data));
                 }else if(req.url === "/news"){
                    var data = mock.mock({
                        "id": "@name",
                        "email": "@email",
                        "content": "@csentence"
                    })
                    res.writeHead(200, {
                        "Content-type": "text/json;charset=utf8",
                        "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(data));
                }else{
                    var filename = req.url.split("/")[1];
                    var dataFile = path.join(__dirname,"data",filename+".json"); 
                    fs.exists(dataFile,function(exist){
                        if(exist){
                            fs.readFile(dataFile,function(err,data){
                                if(err){
                                    throw err;
                                }
                                res.end(data.toString())
                            }) 
                        }else{
                            var data = new Error("can't find file" + filename)
                            res.end(JSON.stringify(data));
                        }
                    })
                }
            }
    }))
});
gulp.task('default',function(){
    gulp.start("webserver","webserverr");
});