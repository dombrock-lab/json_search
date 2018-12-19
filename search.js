var fs = require('fs');
function search(url_parts,res){
    fs.readFile('db.json', 'utf8', function(err, contents) {
        const query = url_parts.pathname.split("/")[3].toLowerCase();
        if(query==""){
            res.send("NO_QUERY");
            return;
        }
        const threshold = url_parts.query.t || 3;
        const split_query = query.split(" ");
        console.log(query);
        var results = [];
        //console.log((contents));
        //console.log(JSON.parse(contents));
        contents = JSON.parse(contents);
        for (item in contents){
            console.log("starting item"+item);
            var score = 0;
            const name = contents[item].name.toLowerCase();
            const description = contents[item].description.toLowerCase();
            const tags = contents[item].tags.toLowerCase();
            //console.log(contents[item].name);
            if(name == query){
                score += 10;
            }
            if(name.includes(query)){
                score += 3;
            }
            if(query.includes(name)){
                score += 2;
            }
            for (query_item in split_query){
                if(description.includes(split_query[query_item])){
                    score += 1;
                }
                if(tags.includes(split_query[query_item])){
                    score += 2;
                }
            }
            if(score >= threshold){
                console.log("results for item"+item);
                const result = {
                    "name":contents[item].name,
                    "description":contents[item].description,
                    "tags": contents[item].tags,
                    "data":contents[item].data,
                    "score":score
                };
                //console.log("name: "+name);
                //console.log("result.name: "+result.name);
                results.push(result);
            }
            
        }
        results = JSON.stringify(results);
        res.send(results);
    });
}

exports.search = function(url_parts,res){
    search(url_parts,res);
};