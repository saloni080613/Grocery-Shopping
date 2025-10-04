package com.Freshmart.store.service;

import com.Freshmart.store.repository.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriesService {

    private final CategoriesRepository categoriesRepository;

    @Autowired
    public CategoriesService(CategoriesRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    public List<String> getCategoryNames() {
        return categoriesRepository.findAll().stream()
                .map(cat -> cat.getCategoryName())
                .collect(Collectors.toList());
    }
}


