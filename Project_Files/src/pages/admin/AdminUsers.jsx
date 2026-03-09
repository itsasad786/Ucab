import { useState } from 'react';
import { useData } from '../../context/DataContext';
import Sidebar from '../../components/common/Sidebar';
import { Save, Trash2, Edit } from 'lucide-react';

export default function AdminUsers() {
    const { users, updateUser, deleteUser } = useData();
    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({});

    const startEdit = (u) => {
        setEditId(u.id);
        setEditForm({ name: u.name, email: u.email, role: u.role, phone: u.phone || '' });
    };

    const saveEdit = async () => {
        const result = await updateUser(editId, editForm);
        if (result) setEditId(null);
    };

    const roleBadge = (r) => {
        const map = { rider: 'warning', driver: 'success', admin: 'info' };
        return <span className={`badge badge-${map[r] || 'muted'}`}>{r}</span>;
    };

    return (
        <div className="dashboard-layout">
            <Sidebar role="admin" />
            <main className="main-content">
                <div className="page-header">
                    <h1 className="page-title">User Management</h1>
                    <p className="page-subtitle">View and manage all registered users</p>
                </div>

                <div className="card">
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Joined</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id}>
                                        {editId === u.id ? (
                                            <>
                                                <td>
                                                    <input className="form-control" style={{ padding: '6px 10px', fontSize: 13 }} value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                                                </td>
                                                <td>
                                                    <input className="form-control" style={{ padding: '6px 10px', fontSize: 13 }} value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} />
                                                </td>
                                                <td>
                                                    <input className="form-control" style={{ padding: '6px 10px', fontSize: 13 }} value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} />
                                                </td>
                                                <td>
                                                    <select className="form-control" style={{ padding: '6px 10px', fontSize: 13 }} value={editForm.role} onChange={e => setEditForm({ ...editForm, role: e.target.value })}>
                                                        <option value="rider">rider</option>
                                                        <option value="driver">driver</option>
                                                        <option value="admin">admin</option>
                                                    </select>
                                                </td>
                                                <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{u.joined}</td>
                                                <td>
                                                    <div style={{ display: 'flex', gap: 8 }}>
                                                        <button className="btn btn-success btn-sm" onClick={saveEdit}><Save size={13} /> Save</button>
                                                        <button className="btn btn-outline btn-sm" onClick={() => setEditId(null)}>Cancel</button>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td style={{ fontWeight: 600 }}>{u.name}</td>
                                                <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{u.email}</td>
                                                <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{u.phone || '—'}</td>
                                                <td>{roleBadge(u.role)}</td>
                                                <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{u.joined}</td>
                                                <td>
                                                    <div style={{ display: 'flex', gap: 8 }}>
                                                        <button className="btn btn-outline btn-sm" onClick={() => startEdit(u)}>
                                                            <Edit size={13} />
                                                        </button>
                                                        <button className="btn btn-danger btn-sm" onClick={async () => { await deleteUser(u.id); }}>
                                                            <Trash2 size={13} />
                                                        </button>
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
