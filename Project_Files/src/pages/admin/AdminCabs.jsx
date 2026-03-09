import { useState } from 'react';
import { useData } from '../../context/DataContext';
import Sidebar from '../../components/common/Sidebar';
import { PlusCircle, Trash2, Edit, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminCabs() {
    const { cabs, updateCab, deleteCab } = useData();
    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const navigate = useNavigate();

    const startEdit = (c) => {
        setEditId(c.id);
        setEditForm({ model: c.model, plate: c.plate, seats: c.seats, driver: c.driver, type: c.type });
    };

    const saveEdit = async () => {
        const result = await updateCab(editId, editForm);
        if (result) setEditId(null);
    };

    return (
        <div className="dashboard-layout">
            <Sidebar role="admin" />
            <main className="main-content">
                <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 className="page-title">Cab Management</h1>
                        <p className="page-subtitle">Manage the fleet of registered cabs</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => navigate('/admin/cabs/add')}>
                        <PlusCircle size={16} /> Add New Cab
                    </button>
                </div>

                <div className="card">
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Model</th>
                                    <th>Type</th>
                                    <th>Plate</th>
                                    <th>Seats</th>
                                    <th>Driver</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cabs.map(c => (
                                    <tr key={c.id}>
                                        {editId === c.id ? (
                                            <>
                                                <td><input className="form-control" style={{ padding: '6px 10px', fontSize: 13 }} value={editForm.model} onChange={e => setEditForm({ ...editForm, model: e.target.value })} /></td>
                                                <td>
                                                    <select className="form-control" style={{ padding: '6px 10px', fontSize: 13 }} value={editForm.type} onChange={e => setEditForm({ ...editForm, type: e.target.value })}>
                                                        <option>Mini</option><option>Sedan</option><option>SUV</option>
                                                    </select>
                                                </td>
                                                <td><input className="form-control" style={{ padding: '6px 10px', fontSize: 13 }} value={editForm.plate} onChange={e => setEditForm({ ...editForm, plate: e.target.value })} /></td>
                                                <td><input className="form-control" style={{ padding: '6px 10px', fontSize: 13, width: 64 }} type="number" value={editForm.seats} onChange={e => setEditForm({ ...editForm, seats: +e.target.value })} /></td>
                                                <td><input className="form-control" style={{ padding: '6px 10px', fontSize: 13 }} value={editForm.driver} onChange={e => setEditForm({ ...editForm, driver: e.target.value })} /></td>
                                                <td><span className="badge badge-success">Available</span></td>
                                                <td>
                                                    <div style={{ display: 'flex', gap: 8 }}>
                                                        <button className="btn btn-success btn-sm" onClick={saveEdit}><Save size={13} /> Save</button>
                                                        <button className="btn btn-outline btn-sm" onClick={() => setEditId(null)}>Cancel</button>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td style={{ fontWeight: 600 }}>{c.model}</td>
                                                <td><span className="badge badge-muted">{c.type}</span></td>
                                                <td style={{ fontFamily: 'monospace', fontSize: 13 }}>{c.plate}</td>
                                                <td>{c.seats}</td>
                                                <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{c.driver}</td>
                                                <td><span className={`badge ${c.available ? 'badge-success' : 'badge-danger'}`}>{c.available ? 'Available' : 'Busy'}</span></td>
                                                <td>
                                                    <div style={{ display: 'flex', gap: 8 }}>
                                                        <button className="btn btn-outline btn-sm" onClick={() => startEdit(c)}><Edit size={13} /></button>
                                                        <button className="btn btn-danger btn-sm" onClick={async () => { await deleteCab(c.id); }}><Trash2 size={13} /></button>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
