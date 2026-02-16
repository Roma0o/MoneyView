package com.senac.moneyview.controller;

import com.senac.moneyview.model.Transacao;
import com.senac.moneyview.service.TransacaoService;
import com.senac.moneyview.service.UsuarioService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transacoes")
@CrossOrigin(origins = "*")
public class TransacaoController {
    
    private final TransacaoService transacaoService;
    private final UsuarioService usuarioService;
    
    public TransacaoController(TransacaoService transacaoService, UsuarioService usuarioService) {
        this.transacaoService = transacaoService;
        this.usuarioService = usuarioService;
    }
    
    //Criar
    @PostMapping("/{usuarioId}")
    public Transacao criar(@PathVariable @Valid Long usuarioId, @RequestBody Transacao transacao) {
        return transacaoService.criar(usuarioId, transacao);
    }
    
    //Listar tudo
    @GetMapping
    public List<Transacao> listar() {
        return transacaoService.listarTodas();
    }
    
    //Buscar por id
    @GetMapping("/{id}")
    public Transacao buscar(@PathVariable Long id) {
        return transacaoService.buscarPorId(id);
    }
    
    @PutMapping("/{id}")
    public Transacao atualizar(@PathVariable Long id, @RequestBody Transacao transacao) {
        return transacaoService.atualizar(id, transacao);
    }
    
    //Deletar
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        transacaoService.deletar(id);
    }
}
