package com.senac.moneyview.repository;

import com.senac.moneyview.model.Transacao;
import com.senac.moneyview.model.Usuario;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    
    List<Transacao> findByUsuario(Usuario usuario);
    
}
