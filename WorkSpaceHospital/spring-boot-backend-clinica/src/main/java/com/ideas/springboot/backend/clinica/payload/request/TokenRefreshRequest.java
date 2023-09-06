package com.ideas.springboot.backend.clinica.payload.request;

import jakarta.validation.constraints.NotBlank;

public class TokenRefreshRequest {
	
  @NotBlank
  private String refreshToken;

  public String getRefreshToken() {
    return refreshToken;
  }

  public void setRefreshToken(String refreshToken) {
    this.refreshToken = refreshToken;
  }
}