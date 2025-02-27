package com.utd.ti.soa.esb_service.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import com.utd.ti.soa.esb_service.model.User;

@RestController
@RequestMapping("/api/v1/esb")
public class ESBController {
    private final WebClient webClient = WebClient.create();

    @PostMapping("/createUser")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        // System.out.println("Request Body: " + user);

        try {
            String response = webClient.post()
                .uri("http://localhost:3001/api/users/newuser")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body(BodyInserters.fromValue(user))
                .exchangeToMono(clientResponse -> clientResponse.bodyToMono(String.class))
                .doOnError(error -> System.out.println("Error: " + error.getMessage()))
                .block();

            return ResponseEntity.ok(response);
        } catch (WebClientResponseException e) {
            return ResponseEntity.status(e.getStatusCode()).body("Error en la solicitud: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error interno: " + e.getMessage());
        }
    }

    @GetMapping("/getUsers")
    public ResponseEntity<String> getUsers() {
        // Método para obtener todos los usuarios
        try {
            String response = webClient.get()
                .uri("http://localhost:3001/api/users/getuser")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .exchangeToMono(clientResponse -> clientResponse.bodyToMono(String.class))
                .doOnError(error -> System.out.println("Error: " + error.getMessage()))
                .block();

            return ResponseEntity.ok(response);
        } catch (WebClientResponseException e) {
            return ResponseEntity.status(e.getStatusCode()).body("Error en la solicitud: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error interno: " + e.getMessage());
        }
    }
}