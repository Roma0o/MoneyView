package com.senac.moneyview.service;

import com.senac.moneyview.model.Usuario;
import com.senac.moneyview.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioService usuarioService;

    @Test
    void deveFazerLoginComSucesso() {

        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setEmail("teste@email.com");
        usuario.setSenha("123");

        when(usuarioRepository.findByEmailAndSenha(
                "teste@email.com", "123"))
                .thenReturn(Optional.of(usuario));

        Usuario resultado =
                usuarioService.login("teste@email.com", "123");

        assertNotNull(resultado);
        assertEquals(1L, resultado.getId());
    }

    @Test
    void deveLancarErroQuandoLoginInvalido() {

        when(usuarioRepository.findByEmailAndSenha(
                "errado@email.com", "123"))
                .thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () ->
                usuarioService.login("errado@email.com", "123"));
    }
}
