package com.senac.moneyview.controller;

import com.senac.moneyview.model.Usuario;
import com.senac.moneyview.service.UsuarioService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    
    private final UsuarioService usuarioService;
    
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }
    
    //Criar
    @PostMapping
    public Usuario criar(@RequestBody @Valid Usuario usuario) {
        return usuarioService.criar(usuario);
    }
    
    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario usuario) {
        return usuarioService.login(usuario.getEmail(), usuario.getSenha());
    }

    
    //Listar tudo
    @GetMapping
    public List<Usuario> listar() {
        return usuarioService.listarTodos();
    }
    
    //Buscar por id
    @GetMapping("/{id}")
    public Usuario buscar(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }
    
    //Atualizar
    @PutMapping("/{id}")
    public Usuario atualizar(@PathVariable @Valid Long id,
                             @RequestBody Usuario usuarioAtualizado) {
        return usuarioService.atualizar(id, usuarioAtualizado);
    }
    
    //Deletar
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        usuarioService.deletar(id);
    }
}
