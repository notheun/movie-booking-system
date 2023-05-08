package com.example.demo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;
import java.util.List;

//@Document means the class is stored as a document in a collection in mongoDB
//ie to say : instances of the movies class will be stored as a document under the collection in mongoDB
@Document(collection = "test")
//takes care of boilerplate code - getters, setters etc
@Data
@AllArgsConstructor
@NoArgsConstructor
public class movies {
    @Id
    private ObjectId id;
    private String imdbId;
    private String title;
    private String releaseDate;
    private String trailerLink;
    private String poster;
    private List<String> genres;
    private List<String> backdrops;
    @DocumentReference
    //Will reference movies to reviews using review objectId instead of embedding them (stores an array of Id instead)
    //embedding : having reviews document within movies document (stores array of documents which is slow)
    private List<reviews> reviewIds;

}
