L.drawLocal = {
    draw: {
        toolbar: {
            actions: {
                title: 'Cancelar desenho',
                text: 'Cancelar'
            },
            finish: {
                title: 'Finalizar desenho',
                text: 'Finalizar'
            },
            undo: {
                title: 'Desfazer última ação',
                text: 'Desfazer'
            },
            buttons: {
                polyline: 'Desenhar uma linha',
                polygon: 'Desenhar um polígono',
                rectangle: 'Desenhar um retângulo',
                circle: 'Desenhar um círculo',
                marker: 'Adicionar marcador'
            }
        },
        handlers: {
            circle: {
                tooltip: {
                    start: 'Clique e arraste para desenhar um círculo.'
                },
                radius: 'Raio'
            },
            marker: {
                tooltip: {
                    start: 'Clique no mapa para adicionar um marcador.'
                }
            },
            polygon: {
                tooltip: {
                    start: 'Clique para começar um polígono.',
                    cont: 'Clique para continuar desenhando.',
                    end: 'Clique no primeiro ponto para fechar o polígono.'
                }
            },
            polyline: {
                error: '<strong>Erro:</strong> linhas não podem se cruzar!',
                tooltip: {
                    start: 'Clique para começar uma linha.',
                    cont: 'Clique para continuar.',
                    end: 'Clique no último ponto para finalizar.'
                }
            },
            rectangle: {
                tooltip: {
                    start: 'Clique e arraste para desenhar um retângulo.'
                }
            },
            simpleshape: {
                tooltip: {
                    end: 'Solte para finalizar.'
                }
            }
        }
    },
    edit: {
        toolbar: {
            actions: {
                save: {
                    title: 'Salvar alterações',
                    text: 'Salvar'
                },
                cancel: {
                    title: 'Cancelar edição',
                    text: 'Cancelar'
                },
                clearAll: {
                    title: 'Remover tudo',
                    text: 'Limpar tudo'
                }
            },
            buttons: {
                edit: 'Editar formas',
                editDisabled: 'Nenhuma forma para editar',
                remove: 'Remover formas',
                removeDisabled: 'Nenhuma forma para remover'
            }
        },
        handlers: {
            edit: {
                tooltip: {
                    text: 'Arraste os vértices para editar.',
                    subtext: 'Clique em "Salvar" quando terminar.'
                }
            },
            remove: {
                tooltip: {
                    text: 'Clique em uma forma para removê-la.'
                }
            }
        }
    }
};
