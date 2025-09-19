import React, { useState, useEffect } from 'react';

import {
    Box,
    Card,
    Stack,
    Table,
    Button,
    Modal,
    TableRow,
    TableBody,
    TableCell,
    Container,
    TableHead,
    TextField,
    Typography,
    TableContainer,
} from '@mui/material';

import apiClient from 'src/api';

interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
    direccion: string;
    correo: string;
    telefono: string;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ClientPage() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [open, setOpen] = useState(false);
    const [currentClient, setCurrentClient] = useState<Partial<Cliente>>({});

    const fetchClientes = async () => {
        try {
            const response = await apiClient.get<Cliente[]>('/customer');
            setClientes(response.data);
        } catch (error) {
            console.error('Error al obtener los clientes:', error);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleOpen = (client: Cliente | null = null) => {
        setCurrentClient(client || { nombre: '', apellido: '', correo: '' });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { id, ...clientData } = currentClient;

        try {
            if (id) {
                await apiClient.put(`/customer/update/${id}`, clientData);
            } else {
                await apiClient.post('/customer/create', clientData);
            }
            fetchClientes();
            handleClose();
        } catch (error) {
            console.error('Error al guardar el cliente:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Estás seguro?')) {
            try {
                await apiClient.delete(`/customer/delete/${id}`);
                fetchClientes();
            } catch (error) {
                console.error('Error al eliminar el cliente:', error);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentClient({ ...currentClient, [name]: value });
    };

    return (
        <>
            <title>Clientes | Dashboard</title>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">Clientes</Typography>
                    <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                        Nuevo Cliente
                    </Button>
                </Stack>
                <Card>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Apellido</TableCell>
                                    <TableCell>Correo</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {clientes.map((cliente) => (
                                    <TableRow key={cliente.id}>
                                        <TableCell>{cliente.nombre}</TableCell>
                                        <TableCell>{cliente.apellido}</TableCell>
                                        <TableCell>{cliente.correo}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleOpen(cliente)} size="small">
                                                Editar
                                            </Button>
                                            <Button onClick={() => handleDelete(cliente.id)} size="small" color="error">
                                                Eliminar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Container>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style} component="form" onSubmit={handleSubmit}>
                    <Typography variant="h6">{currentClient.id ? 'Editar' : 'Crear'} Cliente</Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Nombre"
                        name="nombre"
                        value={currentClient.nombre || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Apellido"
                        name="apellido"
                        value={currentClient.apellido || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Correo"
                        name="correo"
                        value={currentClient.correo || ''}
                        onChange={handleInputChange}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                        Guardar
                    </Button>
                </Box>
            </Modal>
        </>
    );
}