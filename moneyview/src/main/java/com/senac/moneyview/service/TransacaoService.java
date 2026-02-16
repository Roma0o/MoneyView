package com.senac.moneyview.service;

import com.senac.moneyview.model.Transacao;
import com.senac.moneyview.model.Usuario;
import com.senac.moneyview.repository.TransacaoRepository;
import com.senac.moneyview.repository.UsuarioRepository;
import java.util.List;
import org.springframework.stereotype.Service;



@Service
public class TransacaoService {
    
    private final TransacaoRepository transacaoRepository;
    private final UsuarioRepository usuarioRepository;
    
    public TransacaoService(TransacaoRepository transacaoRepository,
                            UsuarioRepository usuarioRepository) {
        this.transacaoRepository = transacaoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public Transacao criar(Long usuarioId, Transacao transacao) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        transacao.setUsuario(usuario);
        return transacaoRepository.save(transacao);
    }
    
    public List<Transacao> listarTodas() {
        return transacaoRepository.findAll();
    }
    
    public Transacao buscarPorId(Long id){
        return transacaoRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Transação não encontrada"));
    }
    
    public Transacao atualizar(Long id, Transacao transacaoAtualizada){
        Transacao transacao = buscarPorId(id);
        
        transacao.setDescricao(transacaoAtualizada.getDescricao());
        transacao.setTipo(transacaoAtualizada.getTipo());
        transacao.setValor(transacaoAtualizada.getValor());
        transacao.setData(transacaoAtualizada.getData());
        
        return transacaoRepository.save(transacao);
    }

    public void deletar(Long id) {
        if (!transacaoRepository.existsById(id)) {
            throw new RuntimeException("Transação não encontrada");
        }
        transacaoRepository.deleteById(id);
    }
}
